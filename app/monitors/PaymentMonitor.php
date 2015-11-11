<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/08/2015
 * Time: 12:56 AM
 */

namespace app\monitors;

use app\domain\Membership;
use app\domain\Payment;
use app\domain\User;
use app\security\PasswordUtil;
use app\services\EmailService;
use app\services\UserService;
use DateTime;
use vhs\Logger;
use vhs\monitors\Monitor;

class PaymentMonitor extends Monitor {

    /** @var Logger */
    private $logger;

    public function Init(Logger &$logger = null)
    {
        $this->logger = &$logger;
        Payment::onAnyCreated([$this, "paymentCreated"]);
    }

    private function log($message)
    {
        $this->logger->log("[PaymentMonitor] {$message}");
    }

    public function paymentCreated($args)
    {
        $emailService = new EmailService();

        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'].'/';

        $host = $protocol.$domainName;

        /** @var Payment $payment */
        $payment = $args[0];

        if ($payment->status == 1)
            return;

        /** @var User $user */
        $user = null;
        $users = User::findByEmail($payment->payer_email);

        if (count($users) > 1) {
            $this->log("Found more than one user for email '{$payment->payer_email}' unable to process payment");
            return;
        } elseif (count($users) == 1) {
            $user = $users[0];
        }

        //TODO get membership type via item_name/item_number from payment record
        /** @var Membership $membership */
        $membership = Membership::findForPriceLevel($payment->rate_amount);
        if (is_null($membership)) {
            $memberships = Membership::findByCode("member");

            if (!is_null($memberships) && count($memberships) == 1) {
                $membership = $memberships[0];
            } else {
                $this->log("Missing membership type 'member'. Unable to process payment.");
                return;
            }
        }

        $userService = new UserService();

        if (is_null($user)) { //new user
            try {
                $user = $userService->Create(
                    $payment->payer_email,
                    PasswordUtil::generate(),
                    $payment->payer_email,
                    $payment->payer_fname,
                    $payment->payer_lname,
                    $membership->id
                );
            } catch (\Exception $ex) {
                //this shouldn't happen... we should've found the user by email otherwise...
                $this->log($ex->getMessage());
                return;
            }

            $emailService->EmailUser(
                [ 'email' => NOMOS_FROM_EMAIL ],
                '[Nomos] New User Created!',
                'admin_newuser',
                [
                    'email' => $payment->payer_email,
                    'fname' => $payment->payer_fname,
                    'lname' => $payment->payer_lname
                ]
            );

        } else {
            if ($user->membership_id != $membership->id)
                $userService->UpdateMembership($user->id, $membership->id);
        }

        $expiry = new DateTime($payment->date);
        $expiry->add(new \DateInterval("P1M1W")); //add 1 month with a 1 week grace period

        $user->mem_expire = $expiry->format("Y-m-d H:i:s");

        $user->active = "y";

        $user->save();

        $payment->user_id = $user->id;
        $payment->membership_id = $membership->id;
        $payment->status = 1; //processed
        $payment->save();

        $emailService->EmailUser(
            [ 'email' => NOMOS_FROM_EMAIL ],
            '[Nomos] User payment made!',
            'admin_payment',
            [
                'email' => $payment->payer_email,
                'fname' => $payment->payer_fname,
                'lname' => $payment->payer_lname,
                'amount' => $payment->rate_amount,
                'pp' => $payment->pp
            ]
        );

        $emailService->EmailUser(
            $user,
            'VHS Membership Payment Received!',
            'payment',
            [
                'host' => $host,
                'fname' => $user->fname,
            ]
        );
    }
}
