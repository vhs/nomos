<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 2:55 PM.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IUserService1 extends IContract {
    /**
     * @permission administrator|grants
     *
     * @param mixed $filters
     *
     * @return mixed
     */
    public function CountUsers($filters);

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
     * @return mixed
     */
    public function Create($username, $password, $email, $fname, $lname, $membershipid);

    /**
     * @permission grants
     *
     * @param int $userid
     *
     * @return mixed
     */
    public function GetGrantUserPrivileges($userid);

    /**
     * @permission user|administrator
     *
     * @param int $userid
     *
     * @return mixed
     */
    public function GetStanding($userid);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetStatuses();

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return mixed
     */
    public function GetUser($userid);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetUsers();

    /**
     * @permission grants
     *
     * @param int   $userid
     * @param mixed $privilege
     *
     * @return mixed
     */
    public function GrantPrivilege($userid, $privilege);

    /**
     * @permission administrator|grants
     *
     * @param int   $page
     * @param int   $size
     * @param mixed $columns
     * @param mixed $order
     * @param mixed $filters
     *
     * @return mixed
     */
    public function ListUsers($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param int   $userid
     * @param mixed $privileges
     *
     * @return mixed
     */
    public function PutUserPrivileges($userid, $privileges);

    /**
     * @permission anonymous
     *
     * @param string $username
     * @param string $password
     * @param string $email
     * @param string $fname
     * @param string $lname
     *
     * @return mixed
     */
    public function Register($username, $password, $email, $fname, $lname);

    /**
     * @permission anonymous
     *
     * @param string $email
     *
     * @return mixed
     */
    public function RequestPasswordReset($email);

    /**
     * @permission user
     *
     * @param string $email
     *
     * @return mixed
     */
    public function RequestSlackInvite($email);

    /**
     * @permission anonymous
     *
     * @param string $token
     * @param string $password
     *
     * @return mixed
     */
    public function ResetPassword($token, $password);

    /**
     * @permission grants
     *
     * @param int   $userid
     * @param mixed $privilege
     *
     * @return mixed
     */
    public function RevokePrivilege($userid, $privilege);

    /**
     * @permission administrator
     *
     * @param int  $userid
     * @param bool $cash
     *
     * @return mixed
     */
    public function UpdateCash($userid, $cash);

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @return mixed
     */
    public function UpdateEmail($userid, $email);

    /**
     * @permission administrator
     *
     * @param int   $userid
     * @param mixed $date
     *
     * @return mixed
     */
    public function UpdateExpiry($userid, $date);

    /**
     * @permission administrator
     *
     * @param int $userid
     * @param int $membershipid
     *
     * @return mixed
     */
    public function UpdateMembership($userid, $membershipid);

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $fname
     * @param string $lname
     *
     * @return mixed
     */
    public function UpdateName($userid, $fname, $lname);

    /**
     * @permission administrator|user
     *
     * @param int  $userid
     * @param bool $subscribe
     *
     * @return mixed
     */
    public function UpdateNewsletter($userid, $subscribe);

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $password
     *
     * @return mixed
     */
    public function UpdatePassword($userid, $password);

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @return void
     */
    public function UpdatePaymentEmail($userid, $email);

    /**
     * @permission administrator
     *
     * @param int   $userid
     * @param mixed $status
     *
     * @return mixed
     */
    public function UpdateStatus($userid, $status);

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @return void
     */
    public function UpdateStripeEmail($userid, $email);

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $username
     *
     * @return mixed
     */
    public function UpdateUsername($userid, $username);
}
