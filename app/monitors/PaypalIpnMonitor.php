<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/08/2015
 * Time: 12:56 AM
 */

namespace app\monitors;

use app\domain\Ipn;
use app\domain\Payment;
use DateTime;
use vhs\Logger;
use vhs\monitors\Monitor;

class PaypalIpnMonitor extends Monitor {

    /** @var Logger */
    private $logger;

    public function Init(Logger &$logger = null) {
        $this->logger = &$logger;
        Ipn::onAnyCreated([$this, "handleCreated"]);
    }

    public function handleCreated($args)
    {
        /** @var Ipn $ipn */
        $ipn = $args[0];

        if ($ipn->validation == "VERIFIED" && $ipn->payment_status == "Completed") {
            $this->logger->log("We have a valid $ipn record, create a transaction, update users, etc");

            $kvp = explode("&", $ipn->raw);

            $raw = array();

            foreach($kvp as $item)
            {
                $pair = explode("=", $item);

                if (count($pair) == 2)
                    $raw[$pair[0]] = $pair[1];
            }

            //todo this should prob be a paypal transaction id
            if (Payment::exists($ipn->id))
            {
                $this->logger->log("Payment record already exists for this IPN transaction.. odd");
                return;
            }

            $payment = new Payment();

            $payment->txn_id = (array_key_exists("txn_id", $raw)) ? $raw["txn_id"] : $ipn->id;

            $payment->rate_amount = $ipn->payment_amount;
            $payment->currency = $ipn->payment_currency;
            $payment->pp = "PayPal";

            $payment->status = 0; //we haven't processed the payment internally yet

            $payment->payer_email = $ipn->payer_email;
            $payment->payer_fname = (array_key_exists("first_name", $raw)) ? $raw["first_name"] : $ipn->payer_email;
            $payment->payer_lname = (array_key_exists("last_name", $raw)) ? $raw["last_name"] : $ipn->payer_email;

            $payment->item_number = $ipn->item_number;
            $payment->item_name = $ipn->item_name;
            $payment->date = (array_key_exists("payment_date", $raw)) ? (new DateTime(urldecode($raw["payment_date"])))->format("Y-m-d H:i:s") : $ipn->created; //todo ensure timezones

            $payment->save();
        }
    }

}