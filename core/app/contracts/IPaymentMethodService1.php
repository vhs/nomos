<?php

namespace app\contracts;

use vhs\services\IContract;

interface IPaymentMethodService1 extends IContract {

    /**
     * @permission administrator|user
     * @param $userid
     * @return mixed
     */
    public function GetAllUserPaymentMethods($userid);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $paymentmethodid
     * @return mixed
     */
    public function AttachUserPaymentMethod($userid, $paymentmethodid);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $paymentmethodid
     * @return mixed
     */
    public function RemoveUserPaymentMethod($userid, $paymentmethodid);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $paymentmethodid
     * @param $details
     * @return mixed
     */
    public function UpdateUserPaymentMethod($userid, $paymentmethodid, $details);
}
