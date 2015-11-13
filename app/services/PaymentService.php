<?php

namespace app\services;


use app\contracts\IPaymentService1;
use app\domain\Payment;
use app\schema\SettingsSchema;
use vhs\database\Database;
use vhs\domain\Filter;
use vhs\security\CurrentUser;
use vhs\services\Service;

class PaymentService extends Service implements IPaymentService1 {

    /**
     * @permission administrator|user
     * @param $id
     * @return mixed
     */
    public function GetPayment($id) {
        $payment = Payment::find($id);

        if (is_null($payment))
            return null;

        if (CurrentUser::getIdentity() == $payment->user_id || CurrentUser::hasAnyPermissions("administrator"))
            return $payment;

        return null;
    }

    public function ListUserPayments($userid, $page, $size, $columns, $order, $filters) {
        if (!(CurrentUser::getIdentity() == $userid || CurrentUser::hasAnyPermissions("administrator")))
            return null;

        $userFilter = Filter::Equal("user_id", $userid);

        if (is_null($filters) || $filters == "")
            $filters = $userFilter;
        else
            $filters = Filter::_And($userFilter, $filters);

        return Payment::page($page, $size, $columns, $order, $filters);
    }

    public function ListPayments($page, $size, $columns, $order, $filters) {
        return Payment::page($page, $size, $columns, $order, $filters);
    }
}