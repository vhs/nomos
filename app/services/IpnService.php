<?php
/**
* Created by: Fuck you, I am not giving you my name
 * User: Steven Smethurst
 * Date: 2015Jul25
 *
 */

namespace app\services;


use app\contracts\IUserService1;
use app\domain\Key;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

class IpnService extends Service implements IIpnService1 
{
	public function Paypal($payment_status, $mc_gross, $mc_currency, $payer_email, $item_name, $item_number )
	{
    	return NULL; 
	}
};