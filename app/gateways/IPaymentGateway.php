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
    /**
     * Name.
     *
     * @return string
     */
    public function Name();

    /**
     * Process.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function Process($data);
}
