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

		/** 
		 * Capture the IPN messages that PayPal sends to your listener.
		 * After receiving an IPN message from PayPal, you must respond to PayPal with a POST message 
		 * that is an exact copy of the received message but with "cmd=_notify-validate" added to the 
		 * end of the message. Append to your message a duplicate of the notification received (the same 
		 * IPN fields and values in the exact order you received them):
		 * Source: https://developer.paypal.com/docs/classic/ipn/ht_ipn/ 
		 */

		// read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
		$req = 'cmd=_notify-validate'. $ipn->raw ; 
		 
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


	// http://192.168.38.10/services/web/IpnService1.svc/Paypal?
	// 		mc_gross=19.95&protection_eligibility=Eligible&address_status=confirmed&payer_id=LPLWNMTBWMFAY&
	//		tax=0.00&address_street=1+Main+St&payment_date=20%3A12%3A59+Jan+13%2C+2009+PST&payment_status=Completed&
	// 		charset=windows-1252&address_zip=95131&first_name=Test&mc_fee=0.88&address_country_code=US&address_name=Test+User&notify_version=2.6&
	//		custom=&payer_status=verified&address_country=United+States&address_city=San+Jose&quantity=1&verify_sign=AtkOfCXbDm2hu0ZELryHFjY-Vb7PAUvS6nMXgysbElEn9v-1XcmSoGtf&
	//		payer_email=gpmac_1231902590_per%40paypal.com&txn_id=61E67681CH3238416&payment_type=instant&last_name=User&address_state=CA&
	// 		receiver_email=gpmac_1231902686_biz%40paypal.com&payment_fee=0.88&receiver_id=S8XGHLYDW9T3S&txn_type=express_checkout&item_name=&mc_currency=USD&item_number=&
	//		residence_country=US&test_ipn=1&handling_amount=0.00&transaction_subject=&payment_gross=19.95&shipping=0.00
	public function Paypal($payment_status, $mc_gross, $mc_currency, $payer_email, $item_name, $item_number )
	{

		// Create the IPN recored with invalid. 
		$ipn = new Ipn() ; 

		$ipn->validation 		= "INVALID";
        $ipn->payment_status 	= $payment_status ; 
        $ipn->payment_amount 	= $mc_gross ; 
        $ipn->payment_currency 	= $mc_currency ; 
        $ipn->payer_email 		= $payer_email ; 
        $ipn->raw 				= "mc_gross=19.95&protection_eligibility=Eligible&address_status=confirmed&payer_id=LPLWNMTBWMFAY&tax=0.00&address_street=1+Main+St&payment_date=20%3A12%3A59+Jan+13%2C+2009+PST&payment_status=Completed&charset=windows-1252&address_zip=95131&first_name=Test&mc_fee=0.88&address_country_code=US&address_name=Test+User&notify_version=2.6&custom=&payer_status=verified&address_country=United+States&address_city=San+Jose&quantity=1&verify_sign=AtkOfCXbDm2hu0ZELryHFjY-Vb7PAUvS6nMXgysbElEn9v-1XcmSoGtf&payer_email=gpmac_1231902590_per%40paypal.com&txn_id=61E67681CH3238416&payment_type=instant&last_name=User&address_state=CA&receiver_email=gpmac_1231902686_biz%40paypal.com&payment_fee=0.88&receiver_id=S8XGHLYDW9T3S&txn_type=express_checkout&item_name=&mc_currency=USD&item_number=&residence_country=US&test_ipn=1&handling_amount=0.00&transaction_subject=&payment_gross=19.95&shipping=0.00"; 
        $ipn->save();

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