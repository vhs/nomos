<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/08/2015
 * Time: 12:56 AM
 */

namespace app\monitors;

use app\domain\Ipn;
use app\domain\Membership;
use app\domain\User;
use app\security\PasswordUtil;
use app\services\EmailService;
use app\services\UserService;
use vhs\Logger;
use vhs\monitors\Monitor;

class PaypalIpnMonitor extends Monitor {

    private $logger;

    public function Init(Logger &$logger = null) {
        $this->logger = &$logger;
        Ipn::onAnyCreated([$this, "handleCreated"]);
    }

    public function handleCreated($args)
    {
        $ipn = $args[0];

        if ($ipn->validation == "VERIFIED" && $ipn->payment_status == "COMPLETED") {
            //todo maybe do a hash or record the id of this $ipn record to mark it completed
            //todo create transaction, update user, etc

            $this->logger->log("We have a valid $ipn record, create a transaction, update users, etc");

            $kvp = explode("&", $ipn->raw);

            $raw = array();

            foreach($kvp as $item)
            {
                $pair = explode("=", $item);

                if (count($pair) == 2)
                    $raw[$pair[0]] = $pair[1];
            }

            /* todo
                the bare minimum is to email the admin (set to my email right now, but we should fix config -
                I'll do an issue report now), and create an account on new user
                so... get an IPN, compare paypal email with existing, if new, create new account, activate as
                 member/friend, send admin email
                if existing, set type to member/friend/keyholder(if allowed), extend expiry, activate user account,
                email admin
                a failed IPN should also email admin
            */

            $isExistingUser = false;

            $user = User::findByEmail($ipn->payer_email);

            $member = Membership::findByCode("member");

            $userService = new UserService();

            if (is_null($user)) {
                $password = PasswordUtil::hash(
                    substr(
                        str_shuffle(
                            str_repeat('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',16)
                        ),0,16
                    )
                );

                $fname = (in_array("first_name", $raw)) ? $raw["first_name"] : $ipn->payer_email;
                $lname = (in_array("last_name", $raw)) ? $raw["last_name"] : $ipn->payer_email;

                try {
                    $user = $userService->Create(
                        $ipn->payer_email,
                        $password,
                        $ipn->payer_email,
                        $fname,
                        $lname,
                        $member->id
                    );
                } catch (\Exception $ex) {
                    //this shouldn't happen... we should've found the user by email otherwise...
                    $this->logger->log($ex->getMessage());
                }

                //email admin
            } else {
                $newMembership = Membership::findForPriceLevel($ipn->payment_amount);

                if ($user->membership_id != $newMembership->id)
                {
                    //todo need to do a permission check on the user prob..
                    $userService->UpdateMembership($user->id, $newMembership->id);
                }

                $user->active = "y";

                //todo need to calc the new expiry date.
                //$user->mem_expire = "";

                $user->save();

                //email user & admin
            }
        }
    }

}