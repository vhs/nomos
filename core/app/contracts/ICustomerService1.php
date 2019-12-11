<?php

namespace app\contracts;

use vhs\services\exceptions\InvalidInputException;
use vhs\services\IContract;

class CustomerDoesNotExistException extends InvalidInputException {}

interface ICustomerService1 extends IContract {

    /**
     * @permission administrator|user
     * @param $userid
     * @return mixed
     */
    public function GetCustomerProfile($userid);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $address
     * @param $phone
     * @return mixed
     */
    public function PutCustomerProfile($userid, $address, $phone);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $paymentmethodid
     * @return mixed
     */
    public function AttachPaymentMethod($userid, $paymentmethodid);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $paymentmethodid
     * @return mixed
     */
    public function SetDefaultPaymentMethod($userid, $paymentmethodid);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $paymentmethodid
     * @return mixed
     */
    public function DetachPaymentMethod($userid, $paymentmethodid);
}
