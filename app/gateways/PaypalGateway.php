<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/17/2015
 * Time: 4:12 PM.
 */

namespace app\gateways;

use app\domain\Ipn;

class PaypalGateway implements IPaymentGateway {
    public function CreateInvalidIPNRecord($raw) {
        // Create the IPN record in the database
        $ipn = new Ipn();
        $ipn->validation = 'INVALID';
        $ipn->raw = $raw;
        $ipn->save();

        return 'INVALID';
    }

    public function CreateIPNRecord($payment_status, $mc_gross, $mc_currency, $payer_email, $item_name, $item_number, $raw) {
        // Create the IPN record in the database
        $ipn = new Ipn();

        $ipn->validation = 'VERIFIED';
        $ipn->payment_status = $payment_status;
        $ipn->payment_amount = $mc_gross;
        $ipn->payment_currency = $mc_currency;
        $ipn->payer_email = $payer_email;
        $ipn->item_name = $item_name;
        $ipn->item_number = $item_number;
        $ipn->raw = $raw;
        $ipn->save();

        return $ipn->validation;
    }

    public function Name() {
        return 'paypal';
    }

    public function Process($data) {
        // Put this url into paypal
        // IPN URL: http://cook.vanhack.ca:8888/services/gateways/paypal

        // read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
        $req = 'cmd=_notify-validate';

        // Read the values from the url
        foreach ($data as $key => $value) {
            $value = urlencode($value);
            $req .= "&$key=$value";
        }

        // Step 2: POST IPN data back to PayPal to validate
        // ToDo: this should be an option available from the admin interface
        $paypal = 'https://ipnpb.paypal.com/cgi-bin/webscr';
        if (DEBUG) {
            $paypal = 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr';
        }

        $ch = curl_init($paypal);

        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Connection: Close']);

        $error = null;

        if (!($response = curl_exec($ch))) {
            $error = 'Error: Got ' . curl_error($ch) . ' when processing IPN data' . $req;
        }

        curl_close($ch);

        if (!is_null($error)) {
            throw new PaymentGatewayException($error);
        }

        // The IPN is verified, process it
        // inspect IPN validation result and act accordingly
        if (strcmp($response, 'VERIFIED') == 0) {
            $result = $this->CreateIPNRecord(
                array_key_exists('payment_status', $_REQUEST) ? $_REQUEST['payment_status'] : null,
                array_key_exists('mc_gross', $_REQUEST) ? $_REQUEST['mc_gross'] : null,
                array_key_exists('mc_currency', $_REQUEST) ? $_REQUEST['mc_currency'] : null,
                array_key_exists('payer_email', $_REQUEST) ? $_REQUEST['payer_email'] : null,
                array_key_exists('item_name', $_REQUEST) ? $_REQUEST['item_name'] : null,
                array_key_exists('item_number', $_REQUEST) ? $_REQUEST['item_number'] : null,
                $req
            );

            return $result;
        } elseif (strcmp($response, 'INVALID') == 0) {
            // IPN invalid, log for manual investigation
            $result = $this->CreateInvalidIPNRecord($req);
            throw new PaymentGatewayException('Error: Could not validate paypal IPN ' . $req);
        }

        $this->CreateInvalidIPNRecord($req);
        throw new PaymentGatewayException('Error: Unknown Paypal IPN Error ' . $req);
    }
}
