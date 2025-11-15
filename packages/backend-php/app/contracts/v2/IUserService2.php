<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 2:55 PM.
 */

namespace app\contracts\v2;

use app\domain\User;
use app\dto\ServiceResponseError;
use app\dto\ServiceResponseSuccess;
use vhs\services\IContract;

/** @typescript */
interface IUserService2 extends IContract {
    /**
     * @permission administrator|grants
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountUsers($filters): int;

    /**
     * @permission administrator
     *
     * @param string $username
     * @param string $password
     * @param string $email
     * @param string $fname
     * @param string $lname
     * @param int    $membershipid
     *
     * @return \app\domain\User
     */
    public function Create($username, $password, $email, $fname, $lname, $membershipid): User;

    /**
     * @permission user|administrator
     *
     * @param int $userid
     *
     * @return bool
     */
    public function GetStanding($userid): bool;

    /**
     * @permission administrator
     *
     * @return mixed [array{title: 'Active'; code: 'y'},array{title: 'Pending'; code: 't'},array{title: 'Inactive'; code: 'n'},array{title: 'Banned'; code: 'b'}]
     */
    public function GetStatuses(): mixed;

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return \app\domain\User|null
     */
    public function GetUser($userid): User|null;

    /**
     * Get the privileges that are grantable to the specified user by the user calling this service method.
     *
     * @permission grants
     *
     * @param int $userid
     *
     * @return array<string,string>|array<string>
     */
    public function GetUserGrantablePrivileges($userid): array;

    /**
     * @permission administrator
     *
     * @return \app\domain\User[]
     */
    public function GetUsers(): array;

    /**
     * @permission grants
     *
     * @param int    $userid
     * @param string $privilege
     *
     * @return bool
     */
    public function GrantPrivilege($userid, $privilege): bool;

    /**
     * @permission administrator|grants
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\User[]
     */
    public function ListUsers($page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator
     *
     * @param int             $userid
     * @param string|string[] $privileges
     *
     * @return bool
     */
    public function PutUserPrivileges($userid, $privileges): bool;

    /**
     * @permission anonymous
     *
     * @param string $username
     * @param string $password
     * @param string $email
     * @param string $fname
     * @param string $lname
     *
     * @return \app\domain\User
     */
    public function Register($username, $password, $email, $fname, $lname): User;

    /**
     * @permission anonymous
     *
     * @param string $email
     *
     * @return \app\dto\ServiceResponseError|\app\dto\ServiceResponseSuccess
     */
    public function RequestPasswordReset($email): ServiceResponseSuccess|ServiceResponseError;

    /**
     * @permission user
     *
     * @param string $email
     *
     * @return bool|string|null
     */
    public function RequestSlackInvite($email): bool|string|null;

    /**
     * @permission anonymous
     *
     * @param string $token
     * @param string $password
     *
     * @return \app\dto\ServiceResponseError|\app\dto\ServiceResponseSuccess
     */
    public function ResetPassword($token, $password): ServiceResponseSuccess|ServiceResponseError;

    /**
     * @permission grants
     *
     * @param int    $userid
     * @param string $privilege
     *
     * @return bool
     */
    public function RevokePrivilege($userid, $privilege): bool;

    /**
     * @permission administrator
     *
     * @param int         $userid
     * @param bool|string $cash
     *
     * @return bool
     */
    public function UpdateCash($userid, $cash): bool;

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @return bool
     */
    public function UpdateEmail($userid, $email): bool;

    /**
     * @permission administrator
     *
     * @param int    $userid
     * @param string $date
     *
     * @return bool
     */
    public function UpdateExpiry($userid, $date): bool;

    /**
     * @permission administrator
     *
     * @param int $userid
     * @param int $membershipid
     *
     * @return bool
     */
    public function UpdateMembership($userid, $membershipid): bool;

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $fname
     * @param string $lname
     *
     * @return bool
     */
    public function UpdateName($userid, $fname, $lname): bool;

    /**
     * @permission administrator|user
     *
     * @param int  $userid
     * @param bool $subscribe
     *
     * @return bool
     */
    public function UpdateNewsletter($userid, $subscribe): bool;

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $password
     *
     * @return bool
     */
    public function UpdatePassword($userid, $password): bool;

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @return bool
     */
    public function UpdatePaymentEmail($userid, $email): bool;

    /**
     * @permission administrator
     *
     * @param int    $userid
     * @param string $status
     *
     * @return bool
     */
    public function UpdateStatus($userid, $status): bool;

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @return bool
     */
    public function UpdateStripeEmail($userid, $email): bool;

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $username
     *
     * @return bool
     */
    public function UpdateUsername($userid, $username): bool;
}
