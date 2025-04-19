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
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function CountPayments($filters);

    /**
     * @permission administrator|user
     *
     * @param int                            $userid
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountUserPayments($userid, $filters);

    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @return mixed
     */
    public function GetPayment($id);

    /**
     * @permission administrator
     *
     * @param int                            $page
     * @param int                            $size
     * @param mixed                          $columns
     * @param mixed                          $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function ListPayments($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator|user
     *
     * @param int                            $userid
     * @param int                            $page
     * @param int                            $size
     * @param mixed                          $columns
     * @param mixed                          $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function ListUserPayments($userid, $page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param int $paymentid
     *
     * @return mixed
     */
    public function ReplayPaymentProcessing($paymentid);
}
