<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/27/2015
 * Time: 3:38 PM
 */

namespace app\processors;


use app\domain\Membership;
use app\domain\Payment;
use app\domain\User;
use app\security\PasswordUtil;
use app\services\EmailService;
use app\services\UserService;
use DateTime;
use vhs\Logger;

class PaymentProcessor
{
    /** @var Logger */
    private $logger;
    private $emailService;
    private $host;

    public function __construct(Logger &$logger = null)
    {
        $this->logger = $logger;
        $this->emailService = new EmailService();
    }

    private function log($message)
    {
        if (!is_null($this->logger))
        $this->logger->log("[PaymentMonitor] {$message}");
    }

    public function paymentCreated($id)
    {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'].'/';

        $this->host = $protocol.$domainName;

        /** @var Payment $payment */
        $payment = Payment::find($id);

        if ($payment->status == 1)
            return;

        /** @var User $user */
        $user = null;
        $users = User::findByPaymentEmail($payment->payer_email);

        if (count($users) > 1) {
            $this->log("Found more than one user for email '{$payment->payer_email}' unable to process payment");
            return;
        } elseif (count($users) == 1) {
            $user = $users[0];
        }

        if (in_array($payment->item_number, Membership::allCodes())) {
            $this->processMemberPayment($user, $payment);
        } elseif ($payment->item_number == "vhs_card_2015") {
            $this->processMembershipCardPayment($user, $payment);
        } else {
            $this->processDonationPayment($user, $payment);
        }
    }

    private function processMembershipCardPayment(User $user = null, Payment $payment) {
        if (is_null($user)) {
            $this->emailService->Email(
                NOMOS_FROM_EMAIL,
                'admin_error',
                [
                    'subject' => "[Nomos] Unknown user purchased Membership Card - " . $payment->payer_fname . " " . $payment->lname,
                    'message' => $payment->fname . " " . $payment->lname . " with email "
                        . $payment->payer_email . " purchased a membership card but we "
                        . "don't have an account for them... they'll need an account before"
                        . " we can issue a member card."
                ]
            );
        } else {
            $this->emailService->Email(
                NOMOS_FROM_EMAIL,
                'admin_membercard_purchased',
                [
                    'email' => $payment->payer_email,
                    'fname' => $payment->payer_fname,
                    'lname' => $payment->payer_lname
                ]
            );

            $this->emailService->EmailUser(
                $user,
                'membercard_purchased',
                [
                    'fname' => $user->fname,
                    'lname' => $user->lname
                ]
            );

            $payment->user_id = $user->id;
        }

        $payment->status = 1;

        $payment->save();
    }

    private function processMemberPayment(User $user = null, Payment $payment) {
        /** @var Membership $membership */
        $membership = null;

        $memberships = Membership::findByCode($payment->item_number);

        if (!is_null($memberships) && count($memberships) == 1) {
            $membership = $memberships[0];
        } else {
            $memberships = Membership::findByCode(Membership::MEMBER);

            if (!is_null($memberships) && count($memberships) == 1) {
                $membership = $memberships[0];
            } else {
                $this->log("Missing membership type '".Membership::MEMBER."'. Unable to process payment.");
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

            $this->emailService->Email(
                NOMOS_FROM_EMAIL,
                'admin_newuser',
                [
                    'email' => $payment->payer_email,
                    'fname' => $payment->payer_fname,
                    'lname' => $payment->payer_lname,
                    'host' => $this->host,
                    'id' => $user->id
                ]
            );

        } else {
            if ($user->membership_id != $membership->id)
                $userService->UpdateMembership($user->id, $membership->id);
            else
                $userService->UpdateStatus($user->id, "active");
            $user = User::find($user->id);
        }

        $expiry = new DateTime($payment->date);
        $expiry->add(new \DateInterval("P1M1W")); //add 1 month with a 1 week grace period

        $user->mem_expire = $expiry->format("Y-m-d H:i:s");

        $user->save();

        $payment->user_id = $user->id;
        $payment->membership_id = $membership->id;
        $payment->status = 1; //processed
        $payment->save();

        $this->emailService->Email(
            NOMOS_FROM_EMAIL,
            'admin_payment',
            [
                'email' => $payment->payer_email,
                'fname' => $payment->payer_fname,
                'lname' => $payment->payer_lname,
                'amount' => $payment->rate_amount,
                'pp' => $payment->pp
            ]
        );

        $this->emailService->EmailUser(
            $user,
            'payment',
            [
                'host' => $this->host,
                'fname' => $user->fname,
            ]
        );
    }

    private function processDonationPayment(User $user = null, Payment $payment) {
        if (is_null($user)) {
            $this->emailService->Email(
                NOMOS_FROM_EMAIL,
                'admin_error',
                [
                    'subject' => "[Nomos] Unknown user made a random donation - " . $payment->payer_fname . " " . $payment->lname,
                    'message' => $payment->fname . " " . $payment->lname . " with email "
                        . $payment->payer_email . " made a donation but we "
                        . "don't have an account for them... this could be a mis-matched/unhandled item_number you should check this. "
                        . "item_number = " . $payment->item_number
                        . "item_name = " . $payment->item_name
                        . "rate_amount = " . $payment->rate_amount
                        . "currency = " . $payment->currency
                ]
            );
        } else {
            $this->emailService->Email(
                NOMOS_FROM_EMAIL,
                'admin_donation_random',
                [
                    'email' => $payment->payer_email,
                    'fname' => $payment->payer_fname,
                    'lname' => $payment->payer_lname,
                    'item_number' => $payment->item_number,
                    'item_name' => $payment->item_name,
                    'rate_amount' => $payment->rate_amount,
                    'currency' => $payment->currency
                ]
            );

            $this->emailService->EmailUser(
                $user,
                'donation_random',
                [
                    'fname' => $user->fname,
                    'lname' => $user->lname,
                    'rate_amount' => $payment->rate_amount,
                    'currency' => $payment->currency
                ]
            );

            $payment->user_id = $user->id;
        }

        $payment->status = 1;

        $payment->save();
    }
}