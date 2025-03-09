<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/27/2015
 * Time: 3:38 PM.
 */

namespace app\processors;

use app\adapters\v2\EmailAdapter2;
use app\constants\StringLiterals;
use app\domain\Membership;
use app\domain\Payment;
use app\domain\User;
use app\security\PasswordUtil;
use app\services\EmailService;
use app\services\UserService;
use DateTime;
use vhs\Logger;
use vhs\security\CurrentUser;
use vhs\security\SystemPrincipal;

/** @typescript */
class PaymentProcessor {
    private $host;
    /** @var Logger */
    private $logger;

    public function __construct(Logger &$logger = null) {
        $this->logger = $logger;
    }

    public function paymentCreated($id) {
        $suspended_user = CurrentUser::getPrincipal();
        CurrentUser::setPrincipal(new SystemPrincipal());

        $protocol =
            (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443
                ? StringLiterals::HTTPS_PREFIX
                : StringLiterals::HTTP_PREFIX;
        $domainName = $_SERVER['HTTP_HOST'] . '/';

        $this->host = $protocol . $domainName;

        /** @var Payment $payment */
        $payment = Payment::find($id);

        if ($payment->status == 1) {
            return;
        }

        /** @var User $user */
        $user = null;
        $users = User::findByPaymentEmail($payment->payer_email);

        if (count($users) > 1) {
            $this->log("Found more than one user for email '{$payment->payer_email}' unable to process payment");

            return;
        } elseif (count($users) == 1) {
            $user = $users[0];
        }

        if (is_null($payment->item_number) || $payment->item_number == '' || $payment->item_number == '7_170' || $payment->item_number == '7_142') {
            $payment = $this->resolveLegacyPayments($payment);
        }

        if (in_array($payment->item_number, Membership::allCodes())) {
            $this->processMemberPayment($user, $payment);
        } elseif ($payment->item_number == 'vhs_card_2015') {
            $this->processMembershipCardPayment($user, $payment);
        } else {
            $this->processDonationPayment($user, $payment);
        }

        CurrentUser::setPrincipal($suspended_user);
    }

    private function log($message) {
        if (!is_null($this->logger)) {
            $this->logger->log("[PaymentMonitor] {$message}");
        }
    }

    private function processDonationPayment(User $user = null, Payment $payment) {
        if (is_null($user)) {
            EmailAdapter2::getInstance()->Email(NOMOS_FROM_EMAIL, 'admin_error', [
                'subject' => '[Nomos] Unknown user made a random donation - ' . $payment->payer_fname . ' ' . $payment->lname,
                'message' =>
                    $payment->fname .
                    ' ' .
                    $payment->lname .
                    ' with email ' .
                    $payment->payer_email .
                    ' made a donation but we ' .
                    "don't have an account for them... this could be a mis-matched/unhandled item_number you should check this. " .
                    'item_number = ' .
                    $payment->item_number .
                    'item_name = ' .
                    $payment->item_name .
                    'rate_amount = ' .
                    $payment->rate_amount .
                    'currency = ' .
                    $payment->currency
            ]);
        } else {
            EmailAdapter2::getInstance()->Email(NOMOS_FROM_EMAIL, 'admin_donation_random', [
                'email' => $payment->payer_email,
                'fname' => $payment->payer_fname,
                'lname' => $payment->payer_lname,
                'item_number' => $payment->item_number,
                'item_name' => $payment->item_name,
                'rate_amount' => $payment->rate_amount,
                'currency' => $payment->currency
            ]);

            EmailAdapter2::getInstance()->EmailUser($user, 'donation_random', [
                'fname' => $user->fname,
                'lname' => $user->lname,
                'rate_amount' => $payment->rate_amount,
                'currency' => $payment->currency
            ]);

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
                $this->log("Missing membership type '" . Membership::MEMBER . "'. Unable to process payment.");

                return;
            }
        }

        $userService = new UserService();

        if (is_null($user)) {
            //new user
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

            EmailAdapter2::getInstance()->Email(NOMOS_FROM_EMAIL, 'admin_newuser', [
                'email' => $payment->payer_email,
                'fname' => $payment->payer_fname,
                'lname' => $payment->payer_lname,
                'host' => $this->host,
                'id' => $user->id
            ]);
        } else {
            if ($user->membership_id != $membership->id) {
                $userService->UpdateMembership($user->id, $membership->id);
            } else {
                if ($user->active == 'n') {
                    $userService->UpdateStatus($user->id, 'active');
                }
            }

            $user = User::find($user->id);

            if ($user->active != 'y') {
                EmailAdapter2::getInstance()->Email(NOMOS_FROM_EMAIL, 'admin_error', [
                    'subject' => "[Nomos] User made payment but isn't active - " . $payment->payer_fname . ' ' . $payment->lname,
                    'message' =>
                        $payment->fname .
                        ' ' .
                        $payment->lname .
                        ' with email ' .
                        $payment->payer_email .
                        ' made a payment, but ' .
                        "they are not active or couldn't be activated... this could be that they are banned or still pending activation.\n" .
                        'userid = ' .
                        $user->id .
                        "\n" .
                        'status = ' .
                        $user->active .
                        "\n" .
                        'item_number = ' .
                        $payment->item_number .
                        "\n" .
                        'item_name = ' .
                        $payment->item_name .
                        "\n" .
                        'rate_amount = ' .
                        $payment->rate_amount .
                        "\n" .
                        'currency = ' .
                        $payment->currency .
                        "\n"
                ]);
            }
        }

        $expiry = new DateTime($payment->date);
        $expiry->add(new \DateInterval('P1M1W')); //add 1 month with a 1 week grace period

        $user->mem_expire = $expiry->format('Y-m-d H:i:s');

        $user->save();

        $payment->user_id = $user->id;
        $payment->membership_id = $membership->id;
        $payment->status = 1; //processed
        $payment->save();

        EmailAdapter2::getInstance()->Email(NOMOS_FROM_EMAIL, 'admin_payment', [
            'email' => $payment->payer_email,
            'fname' => $payment->payer_fname,
            'lname' => $payment->payer_lname,
            'amount' => $payment->rate_amount,
            'pp' => $payment->pp
        ]);

        EmailAdapter2::getInstance()->EmailUser($user, 'payment', [
            'host' => $this->host,
            'fname' => $user->fname
        ]);
    }

    private function processMembershipCardPayment(User $user = null, Payment $payment) {
        if (is_null($user)) {
            EmailAdapter2::getInstance()->Email(NOMOS_FROM_EMAIL, 'admin_error', [
                'subject' => '[Nomos] Unknown user purchased Membership Card - ' . $payment->payer_fname . ' ' . $payment->lname,
                'message' =>
                    $payment->fname .
                    ' ' .
                    $payment->lname .
                    ' with email ' .
                    $payment->payer_email .
                    ' purchased a membership card but we ' .
                    "don't have an account for them... they'll need an account before" .
                    ' we can issue a member card.'
            ]);
        } else {
            EmailAdapter2::getInstance()->Email(NOMOS_FROM_EMAIL, 'admin_membercard_purchased', [
                'email' => $payment->payer_email,
                'fname' => $payment->payer_fname,
                'lname' => $payment->payer_lname
            ]);

            EmailAdapter2::getInstance()->EmailUser($user, 'membercard_purchased', [
                'fname' => $user->fname,
                'lname' => $user->lname
            ]);

            $payment->user_id = $user->id;
        }

        $payment->status = 1;

        $payment->save();
    }

    private function resolveLegacyPayments(Payment $payment) {
        /*
         * select distinct item_name, item_number, rate_amount from payments where date > '2016-05-01';
+-----------------------------+--------------------------+-------------+
| item_name                   | item_number              | rate_amount |
+-----------------------------+--------------------------+-------------+
| Member + Donation           | vhs_membership_member    | 30.00       |
| Keyholder + Donation        |                          | 60.00       | <- legacy keyholder
| Member + Donation           |                          | 30.00       | <- legacy member
| VHS Key Holder + Membership |                          | 50.00       | <- legacy keyholder
| VHS Membership              |                          | 25.00       | <- legacy member
| vhs_membership_keyholder    |                          | 50.00       | <- legacy keyholder
| Member + Donation           |                          | 50.00       | <- legacy keyholder
| Keyholder + Donation        | vhs_membership_keyholder | 60.00       |
| Key holder                  | 7_170                    | 50.00       | <- legacy keyholder
| Friend of VHS               |                          | 10.00       | <- legacy friend
| Keyholder + Donation        |                          | 80.00       | <- legacy keyholder
| vhs_membership_keyholder    |                          | 60.00       | <- legacy keyholder
| Key holder                  | 7_142                    | 50.00       | <- legacy keyholder
| VHS Membership Card         | vhs_card_2015            | 5.00        |
| Vancouver Hack Space        |                          | 30.00       | <- donation
+-----------------------------+--------------------------+-------------+
         */

        if (
            $payment->item_name == 'Key holder' &&
            $payment->item_number == '7_142' &&
            ($payment->rate_amount == '50' || $payment->rate_amount == '50.00')
        ) {
            $payment->item_name = 'Legacy Key Holder - item_number 7_142@$50';
            $payment->item_number = 'vhs_membership_keyholder';

            return $payment;
        }

        if (
            $payment->item_name == 'Key holder' &&
            $payment->item_number == '7_170' &&
            ($payment->rate_amount == '50' || $payment->rate_amount == '50.00')
        ) {
            $payment->item_name = 'Legacy Key Holder - item_number 7_170@$50';
            $payment->item_number = 'vhs_membership_keyholder';

            return $payment;
        }

        if (is_null($payment->item_number) || $payment->item_number == '') {
            if ($payment->item_name == 'Keyholder + Donation' && ($payment->rate_amount == '80' || $payment->rate_amount == '80.00')) {
                $payment->item_name = "Legacy Key Holder - item_name 'Keyholder + Donation'@$80";
                $payment->item_number = 'vhs_membership_keyholder';

                return $payment;
            }

            if ($payment->item_name == 'Keyholder + Donation' && ($payment->rate_amount == '60' || $payment->rate_amount == '60.00')) {
                $payment->item_name = "Legacy Key Holder - item_name 'Keyholder + Donation'@$60";
                $payment->item_number = 'vhs_membership_keyholder';

                return $payment;
            }

            if ($payment->item_name == 'VHS Key Holder + Membership' && ($payment->rate_amount == '50' || $payment->rate_amount == '50.00')) {
                $payment->item_name = "Legacy Key Holder - item_name 'VHS Key Holder + Membership'@$50";
                $payment->item_number = 'vhs_membership_keyholder';

                return $payment;
            }

            if ($payment->item_name == 'vhs_membership_keyholder' && ($payment->rate_amount == '60' || $payment->rate_amount == '60.00')) {
                $payment->item_name = "Legacy Key Holder - item_name 'vhs_membership_keyholder'@$60";
                $payment->item_number = 'vhs_membership_keyholder';

                return $payment;
            }

            if ($payment->item_name == 'vhs_membership_keyholder' && ($payment->rate_amount == '50' || $payment->rate_amount == '50.00')) {
                $payment->item_name = "Legacy Key Holder - item_name 'vhs_membership_keyholder'@$50";
                $payment->item_number = 'vhs_membership_keyholder';

                return $payment;
            }

            if ($payment->item_name == 'Member + Donation' && ($payment->rate_amount == '50' || $payment->rate_amount == '50.00')) {
                $payment->item_name = "Legacy Key Holder - item_name 'Member + Donation'@$50";
                $payment->item_number = 'vhs_membership_member';

                return $payment;
            }

            if ($payment->item_name == 'VHS Membership' && ($payment->rate_amount == '25' || $payment->rate_amount == '25.00')) {
                $payment->item_name = "Legacy Member - item_name 'VHS Membership'@$25";
                $payment->item_number = 'vhs_membership_member';

                return $payment;
            }

            if ($payment->item_name == 'Member + Donation' && ($payment->rate_amount == '30' || $payment->rate_amount == '30.00')) {
                $payment->item_name = "Legacy Member - item_name 'Member + Donation'@$30";
                $payment->item_number = 'vhs_membership_member';

                return $payment;
            }

            if ($payment->item_name == 'Friend of VHS' && ($payment->rate_amount == '10' || $payment->rate_amount == '10.00')) {
                $payment->item_name = "Legacy Friend - item_name 'Friend of VHS'@$10";
                $payment->item_number = 'vhs_membership_friend';

                return $payment;
            }
        }

        return $payment;
    }
}
