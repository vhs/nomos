<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/20/2015
 * Time: 12:22 PM.
 */

namespace app\handlers\v2;

use app\contracts\v2\IMemberCardService2;
use app\domain\GenuineCard;
use app\domain\Payment;
use app\domain\User;
use app\exceptions\InvalidInputException;
use app\exceptions\MemberCardException;
use vhs\database\Columns;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\Filter;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class MemberCardServiceHandler2 extends Service implements IMemberCardService2 {
    /**
     * @permission administrator|user
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountGenuineCards($filters): int {
        return GenuineCard::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param int                     $userid
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountUserGenuineCards($userid, $filters): int {
        $filters = $this->addUserIDToFilters($userid, $filters);

        return GenuineCard::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param string $key
     *
     * @return \app\domain\GenuineCard
     */
    public function GetGenuineCardDetails($key): GenuineCard {
        return GenuineCard::findByKey($key)[0];
    }

    /**
     * @permission administrator
     *
     * @param string $email
     * @param string $key
     *
     * @throws \app\exceptions\InvalidInputException
     * @throws \app\exceptions\MemberCardException
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \app\domain\GenuineCard
     */
    public function IssueCard($email, $key): GenuineCard {
        $users = User::findByPaymentEmail($email);

        if (is_null($users) || count($users) != 1) {
            throw new InvalidInputException('Invalid email address');
        }

        if (!$this->ValidateGenuineCard($key)) {
            throw new InvalidInputException('Invalid card');
        }

        $user = $users[0];
        $card = GenuineCard::findByKey($key)[0];

        $payments = Payment::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(Payment::Schema()->Columns()->status, 1),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                // TODO eventually put these into card campaigns or something
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(Payment::Schema()->Columns()->item_number, 'vhs_card_2015'),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(Payment::Schema()->Columns()->payer_email, $email),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(Payment::Schema()->Columns()->user_id, $user->id),
                Where::NotIn(
                    // TODO implement proper typing
                    // @phpstan-ignore property.notFound
                    Payment::Schema()->Columns()->id,
                    Query::Select(
                        GenuineCard::Schema()->Table(),
                        // TODO implement proper typing
                        // @phpstan-ignore property.notFound
                        new Columns(GenuineCard::Schema()->Columns()->paymentid)
                    )
                )
            )
        );

        if (is_null($payments) || count($payments) < 1) {
            throw new MemberCardException('User has not paid for a member card.', HttpStatusCodes::Client_Error_Payment_Required);
        }

        $payment = $payments[0];

        $card->paymentid = $payment->id;
        $card->active = true;
        $card->userid = $user->id;
        $card->owneremail = $email;
        $card->issued = date('Y-m-d H:i:s');
        $card->notes = 'Issued by admin to ' . $user->fname . ' ' . $user->lname;

        $card->save();

        $keyService2 = new KeyServiceHandler2();

        $keyService2->GenerateUserKey($user->id, 'rfid', $key, 'Genuine VHS Membership Card');

        return $card;
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
     * @return \app\domain\GenuineCard[]
     */
    public function ListGenuineCards($page, $size, $columns, $order, $filters): array {
        /** @var \app\domain\GenuineCard[] */
        return GenuineCard::page($page, $size, $columns, $order, $filters);
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
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \app\domain\GenuineCard[]
     */
    public function ListUserGenuineCards($userid, $page, $size, $columns, $order, $filters): array {
        $userService2 = new UserServiceHandler2();
        $user = $userService2->GetUser($userid);

        Domain::coerceFilters($filters);

        if (is_null($user)) {
            throw new UnauthorizedException('User not found or you do not have access');
        }

        $userFilter = Filter::_Or(Filter::Equal('userid', $user->id), Filter::Equal('owneremail', $user->email));

        if (is_null($filters) || $filters == '') {
            $filters = $userFilter;
        } else {
            $filters = Filter::_And($userFilter, $filters);
        }

        /** @var \app\domain\GenuineCard[] */
        return GenuineCard::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param string $key
     * @param string $notes
     *
     * @throws \app\exceptions\MemberCardException
     *
     * @return \app\domain\GenuineCard
     */
    public function RegisterGenuineCard($key, $notes): GenuineCard {
        $keys = GenuineCard::findByKey($key);

        if (!is_null($keys) && count($keys) != 0) {
            //card already registered
            throw new MemberCardException('Failed to register card');
        }

        $card = new GenuineCard();

        $card->key = $key;

        $card->save();

        return $card;
    }

    /**
     * @permission administrator
     *
     * @param string $key
     * @param bool   $active
     *
     * @throws \app\exceptions\InvalidInputException
     *
     * @return bool
     */
    public function UpdateGenuineCardActive($key, $active): bool {
        if (!$this->ValidateGenuineCard($key)) {
            throw new InvalidInputException('Invalid card');
        }

        /** @var GenuineCard */
        $card = GenuineCard::findByKey($key)[0];

        $card->active = $active;

        return $card->save();
    }

    /**
     * @permission authenticated
     *
     * @param string $key
     *
     * @return bool
     */
    public function ValidateGenuineCard($key): bool {
        $keys = GenuineCard::findByKey($key);

        return !is_null($keys) && count($keys) == 1;
    }

    /**
     * addUserIDToFilters.
     *
     * @param int           $userid
     * @param Filter|string $filters
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return Filter
     */
    private function addUserIDToFilters($userid, $filters) {
        $userService2 = new UserServiceHandler2();
        $user = $userService2->GetUser($userid);

        Domain::coerceFilters($filters);

        if (is_null($user)) {
            throw new UnauthorizedException('User not found or you do not have access');
        }

        $userFilter = Filter::Equal('userid', $user->id);

        if (is_null($filters) || $filters == '') {
            $filters = $userFilter;
        } else {
            $filters = Filter::_And($userFilter, $filters);
        }

        return $filters;
    }
}
