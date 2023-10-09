<?php

namespace app\services;

use app\contracts\IPaymentService1;
use app\domain\Payment;
use app\endpoints\web\UserService1;
use app\monitors\PaymentMonitor;
use app\processors\PaymentProcessor;
use app\schema\SettingsSchema;
use Aws\CloudFront\Exception\Exception;
use vhs\database\Database;
use vhs\domain\Filter;
use vhs\loggers\StringLogger;
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

        if (is_null($payment)) {
            return null;
        }

        if (CurrentUser::getIdentity() == $payment->user_id || CurrentUser::hasAnyPermissions('administrator')) {
            return $payment;
        }

        return null;
    }

    public function ListUserPayments($userid, $page, $size, $columns, $order, $filters) {
        $filters = $this->AddUserIDOrEMailToFilters($userid, $filters);

        return Payment::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     * @param $userid
     * @param $filters
     * @return int
     */
    public function CountUserPayments($userid, $filters) {
        $filters = $this->AddUserIDOrEMailToFilters($userid, $filters);

        return Payment::count($filters);
    }

    public function ListPayments($page, $size, $columns, $order, $filters) {
        return Payment::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     * @param $filters
     * @return int
     */
    public function CountPayments($filters) {
        return Payment::count($filters);
    }

    public function ReplayPaymentProcessing($paymentid) {
        $log = new StringLogger();

        $log->log('Attempting a reply of payment id: ' . $paymentid);

        $processor = new PaymentProcessor($log);

        try {
            $processor->paymentCreated($paymentid);
        } catch (\Exception $ex) {
            $log->log('Exception: ' . $ex->getMessage());
            $log->log($ex->getTraceAsString());
        }

        $log->log('Replay complete.');

        return $log->fullText();
    }

    private function AddUserIDOrEMailToFilters($userid, $filters) {
        $userService = new UserService();
        $user = $userService->GetUser($userid);

        if (is_string($filters)) {
            //todo total hack.. this is to support GET params for downloading payments
            $filters = json_decode($filters);
        }

        if (is_null($user)) {
            throw new \Exception('User not found or you do not have access');
        }

        $userFilter = Filter::_Or(Filter::Equal('user_id', $user->id), Filter::Equal('payer_email', $user->email));

        if (is_null($filters) || $filters == '') {
            $filters = $userFilter;
        } else {
            $filters = Filter::_And($userFilter, $filters);
        }

        return $filters;
    }
}
