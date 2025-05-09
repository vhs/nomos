<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:50 PM.
 */

namespace app\contracts\v2;

use app\domain\Payment;
use vhs\services\IContract;

/** @typescript */
interface IPaymentService2 extends IContract {
    /**
     * @permission administrator|user
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountPayments($filters): int;

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountUserPayments($userid, $filters): int;

    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @return \app\domain\Payment|null
     */
    public function GetPayment($id): Payment|null;

    /**
     * @permission administrator
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\Payment[]
     */
    public function ListPayments($page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\Payment[]
     */
    public function ListUserPayments($userid, $page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator
     *
     * @param int $paymentid
     *
     * @return string
     */
    public function ReplayPaymentProcessing($paymentid): string;
}
