<?php

namespace app\services;

use app\contracts\IPaymentService1;
use app\domain\Payment;
use app\processors\PaymentProcessor;
use Aws\CloudFront\Exception\Exception;
use vhs\domain\Domain;
use vhs\domain\Filter;
use vhs\loggers\StringLogger;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

class PaymentService extends Service implements IPaymentService1 {
    /**
     * @permission administrator|user
     *
     * @param $filters
     *
     * @return mixed
     */
    public function CountPayments($filters) {
        return Payment::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $filters
     *
     * @return int
     */
    public function CountUserPayments($userid, $filters) {
        $filters = $this->AddUserIDOrEMailToFilters($userid, $filters);

        return Payment::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param $id
     *
     * @return mixed
     */
    public function GetPayment($id) {
        /** @var \app\domain\Payment */
        $payment = Payment::find($id);

        if (is_null($payment)) {
            return null;
        }

        if (CurrentUser::getIdentity() == $payment->user_id || CurrentUser::hasAnyPermissions('administrator')) {
            return $payment;
        }

        return null;
    }

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
    public function ListPayments($page, $size, $columns, $order, $filters) {
        return Payment::page($page, $size, $columns, $order, $filters);
    }

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
    public function ListUserPayments($userid, $page, $size, $columns, $order, $filters) {
        $filters = $this->AddUserIDOrEMailToFilters($userid, $filters);

        return Payment::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param $paymentid
     *
     * @return mixed
     */
    public function ReplayPaymentProcessing($paymentid) {
        /** @var StringLogger */
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

        // @phpstan-ignore method.notFound
        return $log->fullText();
    }

    /**
     * AddUserIDOrEMailToFilters.
     *
     * @param int           $userid
     * @param Filter|string $filters
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return Filter
     */
    private function AddUserIDOrEMailToFilters($userid, $filters) {
        $userService = new UserService();
        $user = $userService->GetUser($userid);

        Domain::coerceFilters($filters);

        if (is_null($user)) {
            throw new UnauthorizedException('User not found or you do not have access');
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
