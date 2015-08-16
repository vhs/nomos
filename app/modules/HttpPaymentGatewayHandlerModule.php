<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 12:21 PM
 */

namespace app\modules;


use vhs\web\HttpServer;
use vhs\web\IHttpModule;
use app\domain\Ipn;

class HttpPaymentGatewayHandlerModule implements IHttpModule {


    public function __construct( ) {
    }

    public function handle(HttpServer $server)
    {
        // Check to see this is a paypal handel. We want to abandon this as soon as possible.
        $uri = $_SERVER["SCRIPT_NAME"];
        if ($uri != "/services/gateway/paypal") return;

        // Put this url into paypal
        // IPN URL: http://cook.hackspace.ca:8888/services/gateway/paypal

        // read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
        $req = 'cmd=_notify-validate';
        // Read the values from the url
        if(function_exists('get_magic_quotes_gpc')) {
            $get_magic_quotes_exists = true;
        }
        foreach ($_REQUEST as $key => $value) {
            if($get_magic_quotes_exists == true && get_magic_quotes_gpc() == 1) {
                $value = urlencode(stripslashes($value));
            } else {
                $value = urlencode($value);
            }
            $req .= "&$key=$value";
        }

        // Step 2: POST IPN data back to PayPal to validate
        $paypal_sandbox = 'https://www.sandbox.paypal.com/cgi-bin/webscr' ;
        $paypal_live    = 'https://www.paypal.com/cgi-bin/webscr' ;

        $ch = curl_init($paypal_sandbox);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Close'));

        // In wamp-like environments that do not come bundled with root authority certificates,
        // please download 'cacert.pem' from "http://curl.haxx.se/docs/caextract.html" and set
        // the directory path of the certificate as shown below:
        // curl_setopt($ch, CURLOPT_CAINFO, dirname(__FILE__) . '/cacert.pem');
        if( !($response = curl_exec($ch)) ) {
            curl_close($ch);
            $server->log("Error: Got " . curl_error($ch) . " when processing IPN data" . $req );

            $server->clear();
            $server->code(500);
            $server->output("Error: Unknown Paypal IPN Error ");
            $server->end();
            return ;
        }
        curl_close($ch);

        // The IPN is verified, process it
        // inspect IPN validation result and act accordingly
        if (strcmp ($response, "VERIFIED") == 0)
        {
            $result = $this->UpdatePaypalTable( "VERIFIED", $_REQUEST['$payment_status'], $_REQUEST['mc_gross'], $_REQUEST['mc_currency'], $_REQUEST['payer_email'], $_REQUEST['item_name'], $_REQUEST['item_number'], $req ) ;

            $server->clear();
            $server->code(200);
            $server->output($result);
            $server->end();
            return ;

        } else if (strcmp ($response, "INVALID") == 0) {
            // IPN invalid, log for manual investigation
            $server->log("Error: Could not validate paypal IPN" . $req );
            $result = $this->UpdatePaypalTableInvalid( $req ) ;

            $server->clear();
            $server->code(500);
            $server->output("Error: Could not validate paypal IPN");
            $server->end();
            return ;
        }
        else {
            $server->log("Error: Unknown Paypal IPN Error" . $req );
            $result = $this->UpdatePaypalTableInvalid( $req ) ;

            $server->clear();
            $server->code(500);
            $server->output("Error: Unknown Paypal IPN Error ");
            $server->end();
            return ;
        }
    }


    public function UpdatePaypalTableInvalid( $raw) {
        // Create the IPN recored in the database
        $ipn = new Ipn() ;
        $ipn->validation 		= "INVALID";
        $ipn->raw 				= $raw;
        $ipn->save();

        // Print the results
        return "INVALID" ;
    }
    public function UpdatePaypalTable($validation, $payment_status, $mc_gross, $mc_currency, $payer_email, $item_name, $item_number, $raw )
    {

        // Create the IPN recored in the database
        $ipn = new Ipn() ;

        $ipn->validation 		= $validation;
        $ipn->payment_status 	= $payment_status ;
        $ipn->payment_amount 	= $mc_gross ;
        $ipn->payment_currency 	= $mc_currency ;
        $ipn->payer_email 		= $payer_email ;
        $ipn->item_name 		= $item_name ;
        $ipn->item_number 		= $item_number ;
        $ipn->raw 				= $raw;
        $ipn->save();

        // Print the results for debug.
        return $ipn->validation;
    }

    public function handleException(HttpServer $server, \Exception $ex) {}

    public function endResponse(HttpServer $server) { }
}