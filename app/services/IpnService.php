<?php
/**
* Created by: Fuck you, I am not giving you my name
 * User: Steven Smethurst
 * Date: 2015Jul25
 *
 */

namespace app\services;


use app\contracts\IIpnService1;
use app\domain\Key;
use app\domain\Ipn;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

class IpnService extends Service implements IIpnService1 
{
	private function CheckPaypal( $ipnID ) {

		// Get the IPN 
		$ipn = Ipn::find( $ipnID );
		// Check to see if the IPN exists with the ID 
		if(is_null($ipn)) return false;

        // Test the IPN againts paypal to ensure that its valid. 
        // Get the 
		$myPost = array();
		$myPost['payment_status'] 	= urldecode( $ipn->payment_status );
		$myPost['mc_gross'] 		= urldecode( $ipn->payment_amount );
		$myPost['mc_currency'] 		= urldecode( $ipn->payment_currency );
		$myPost['payer_email'] 		= urldecode( $ipn->payer_email );
		$myPost['item_name'] 		= urldecode( $ipn->item_name );
		$myPost['item_number'] 		= urldecode( $ipn->item_number );

		// read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
		$req = 'cmd=_notify-validate';
		if(function_exists('get_magic_quotes_gpc')) {
		   $get_magic_quotes_exists = true;
		} 
		foreach ($myPost as $key => $value) {        
		   if($get_magic_quotes_exists == true && get_magic_quotes_gpc() == 1) { 
		        $value = urlencode(stripslashes($value)); 
		   } else {
		        $value = urlencode($value);
		   }
		   $req .= "&$key=$value";
		}
		 
		// Step 2: POST IPN data back to PayPal to validate
		$ch = curl_init('https://www.paypal.com/cgi-bin/webscr');
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
		
		// Debug 
		if( true ) {
			// This is for debug. 
			$res = "VERIFIED" ; 
		} 
		else 
		{
			if( !($res = curl_exec($ch)) ) {
			    // error_log("Got " . curl_error($ch) . " when processing IPN data");
			    curl_close($ch);
			    exit;
			}
			curl_close($ch);
		}


		// inspect IPN validation result and act accordingly
		if (strcmp ($res, "VERIFIED") == 0) {
		    // The IPN is verified, process it
		    return true ;
		} else if (strcmp ($res, "INVALID") == 0) {
		    // IPN invalid, log for manual investigation
		    return false ;
		}

		// Something went wrong. 
		return false ;
	}


	public function Paypal($payment_status, $mc_gross, $mc_currency, $payer_email, $item_name, $item_number )
	{

		return "Marker 1";

		// Create the IPN recored with invalid. 
		$ipn = new Ipn() ; 
		return "Marker 2";

		$ipn->validation 		= "INVALID";
        $ipn->payment_status 	= $payment_status ; 
        $ipn->payment_amount 	= $mc_gross ; 
        $ipn->payment_currency 	= $mc_currency ; 
        $ipn->payer_email 		= $payer_email ; 
        $ipn->raw 				= "Everything else, all thing things, fuck you i'm right"; 
        $ipn->save();

		return "Marker 3";

        // Check to see if this paypal interaction is valid. 
        // You can test paypal interactions anytime, not just on creation. 
        if( ! $this->CheckPaypal( $ipn->id ) ) {
        	// Paypal said this is bad. 
			$ipn->validation = "INVALID";
        } else {
        	// Paypal says this recored is valid. 
        	$ipn->validation = "VERIFIED";
        }
        // Save the results. 
 		$ipn->save();

 		// Print the results for debug. 
    	return $ipn->validation; 
	}
};