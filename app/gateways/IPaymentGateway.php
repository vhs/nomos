<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/17/2015
 * Time: 4:12 PM.
 */

namespace app\gateways;

/** @typescript */
interface IPaymentGateway {
    public function Name();

    public function Process($data);
}
