<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/20/2015
 * Time: 12:22 PM
 */

namespace app\services;


use app\contracts\IMemberCardService1;
use app\domain\GenuineCard;
use app\domain\Payment;
use app\domain\User;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\domain\Filter;

class MemberCardService implements IMemberCardService1
{

    /**
     * @permission administrator
     * @param $key
     * @param $notes
     * @return GenuineCard
     * @throws \Exception
     */
    public function RegisterGenuineCard($key, $notes)
    {
        $keys = GenuineCard::findByKey($key);

        if (!is_null($keys) || count($keys) <> 0) //card already registered
            throw new \Exception("Failed to register card");

        $card = new GenuineCard();

        $card->key = $key;

        $card->save();

        return $card;
    }

    /**
     * @permission user
     * @param $key
     * @return bool
     */
    public function ValidateGenuineCard($key) {
        $keys = GenuineCard::findByKey($key);

        return (!is_null($keys) || count($keys) == 1);
    }

    /**
     * @permission administrator
     * @param $email
     * @param $key
     * @return mixed
     * @throws \Exception
     */
    public function IssueCard($email, $key)
    {
        $users = User::findByEmail($email);

        if (is_null($users) || count($users) <> 1)
            throw new \Exception("Invalid email address");

        if (!$this->ValidateGenuineCard($key))
            throw new \Exception("Invalid card");

        $user = $users[0];
        $card = GenuineCard::findByKey($key)[0];

        $payments = Payment::where(
            Where::_And(
                Where::Equal(Payment::Schema()->Columns()->status, 1),
                Where::Equal(Payment::Schema()->Columns()->item_number, "vhs_card_2015"), //TODO eventually put these into card campaigns or something
                Where::Equal(Payment::Schema()->Columns()->payer_email, $email),
                Where::Equal(Payment::Schema()->Columns()->user_id, $user->id),
                Where::NotIn(Payment::Schema()->Columns()->id, Query::Select(GenuineCard::Schema()->Table(), GenuineCard::Schema()->Columns()->paymentid))
            )
        );

        if (is_null($payments) || count($payments) < 1)
            throw new \Exception("User has not paid for a member card.");

        $payment = $payments[0];

        $card->paymentid = $payment->id;
        $card->active = true;
        $card->userid = $user->id;
        $card->owneremail = $email;
        $card->issued = date("Y-m-d H:i:s");
        $card->notes = "Issued by admin to " . $user->fname . " " . $user->lname;

        $card->save();

        $keyService = new KeyService();

        $keyService->GenerateUserKey($user->id, "rfid", $key, "Genuine VHS Membership Card");

        return $card;
    }

    /**
     * @permission administrator
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListGenuineCards($page, $size, $columns, $order, $filters)
    {
        GenuineCard::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator|user
     * @param $userid
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     * @throws \Exception
     */
    public function ListUserGenuineCards($userid, $page, $size, $columns, $order, $filters)
    {
        $userService = new UserService();
        $user = $userService->GetUser($userid);

        if (is_string($filters)) //todo total hack.. this is to support GET params for downloading payments
            $filters = json_decode($filters);

        if (is_null($user))
            throw new \Exception("User not found or you do not have access");

        $userFilter = Filter::_Or(Filter::Equal("userid", $user->id), Filter::Equal("owneremail", $user->email));

        if (is_null($filters) || $filters == "")
            $filters = $userFilter;
        else
            $filters = Filter::_And($userFilter, $filters);

        return GenuineCard::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     * @param $key
     * @return mixed
     */
    public function GetGenuineCardDetails($key)
    {
        return GenuineCard::findByKey($key)[0];
    }
}