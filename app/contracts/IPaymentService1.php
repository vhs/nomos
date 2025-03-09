<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:50 PM.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IPaymentService1 extends IContract {
    /**
     * @permission administrator|user
     *
     * @param $filters
     *
     * @return mixed
     */
    public function CountPayments($filters);

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $filters
     *
     * @return int
     */
    public function CountUserPayments($userid, $filters);

    /**
     * @permission administrator|user
     *
     * @param $id
     *
     * @return mixed
     */
    public function GetPayment($id);

    /**
     * @permission administrator
     *
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return mixed
     */
    public function ListPayments($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return mixed
     */
    public function ListUserPayments($userid, $page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param $paymentid
     *
     * @return mixed
     */
    public function ReplayPaymentProcessing($paymentid);
}
