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
	//      mc_gross=19.95&protection_eligibility=Eligible&address_status=confirmed&payer_id=LPLWNMTBWMFAY&
	//		tax=0.00&address_street=1+Main+St&payment_date=20%3A12%3A59+Jan+13%2C+2009+PST&payment_status=Completed&
	// 		charset=windows-1252&address_zip=95131&first_name=Test&mc_fee=0.88&address_country_code=US&address_name=Test+User&notify_version=2.6&
	//		custom=&payer_status=verified&address_country=United+States&address_city=San+Jose&quantity=1&verify_sign=AtkOfCXbDm2hu0ZELryHFjY-Vb7PAUvS6nMXgysbElEn9v-1XcmSoGtf&
	//		payer_email=gpmac_1231902590_per%40paypal.com&txn_id=61E67681CH3238416&payment_type=instant&last_name=User&address_state=CA&
	// 		receiver_email=gpmac_1231902686_biz%40paypal.com&payment_fee=0.88&receiver_id=S8XGHLYDW9T3S&txn_type=express_checkout&item_name=&mc_currency=USD&item_number=&
	//		residence_country=US&test_ipn=1&handling_amount=0.00&transaction_subject=&payment_gross=19.95&shipping=0.00
	public function Paypal($validation, $payment_status, $mc_gross, $mc_currency, $payer_email, $item_name, $item_number, $raw )
	{
		// Create the IPN recored with invalid.
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
};