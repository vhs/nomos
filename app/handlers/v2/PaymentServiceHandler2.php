<?php

namespace app\handlers\v2;

use app\contracts\v2\IPaymentService2;
use app\domain\Payment;
use app\processors\PaymentProcessor;
use vhs\domain\Domain;
use vhs\domain\Filter;
use vhs\loggers\StringLogger;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

/** @typescript */
class PaymentServiceHandler2 extends Service implements IPaymentService2 {
    /**
     * @permission administrator|user
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountPayments($filters): int {
        return Payment::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountUserPayments($userid, $filters): int {
        $filters = $this->addUserIDOrEMailToFilters($userid, $filters);

        return Payment::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @return \app\domain\Payment|null
     */
    public function GetPayment($id): Payment|null {
        /** @var Payment|null */
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
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\Payment[]
     */
    public function ListPayments($page, $size, $columns, $order, $filters): array {
        return Payment::page($page, $size, $columns, $order, $filters);
    }

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
    public function ListUserPayments($userid, $page, $size, $columns, $order, $filters): array {
        $filters = $this->addUserIDOrEMailToFilters($userid, $filters);

        return Payment::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param int $paymentid
     *
     * @return string
     */
    public function ReplayPaymentProcessing($paymentid): string {
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
     * addUserIDOrEMailToFilters.
     *
     * @param int           $userid
     * @param Filter|string $filters
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return Filter
     */
    private function addUserIDOrEMailToFilters($userid, $filters): Filter {
        $userService2 = new UserServiceHandler2();
        $user = $userService2->GetUser($userid);

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
