<?php
/**
 * Created by: Fuck you, I am not giving you my name
 * User: Steven Smethurst
 * Date: 2015Jul25
 */

namespace app\contracts;

use vhs\services\IContract;

interface IIpnService1 extends IContract {

    /**
     * @permission anonymous
     * @param $validation
     * @param $payment_status
     * @param $mc_gross
     * @param $mc_currency
     * @param $payer_email
     * @param $item_name
     * @param $item_number
     * @param $raw
     * @return mixed
     */
    public function Paypal($validation, $payment_status, $mc_gross, $mc_currency, $payer_email, $item_name, $item_number, $raw );
    
};