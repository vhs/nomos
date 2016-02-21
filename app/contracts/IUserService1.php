<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 2:55 PM
 */

namespace app\contracts;


use vhs\services\IContract;

interface IUserService1 extends IContract {

    /**
     * @permission anonymous
     * @param $username
     * @param $password
     * @param $email
     * @param $fname
     * @param $lname
     * @return mixed
     */
    public function Register($username, $password, $email, $fname, $lname);

    /**
     * @permission administrator
     * @param $username
     * @param $password
     * @param $email
     * @param $fname
     * @param $lname
     * @param $membershipid
     * @return mixed
     */
    public function Create($username, $password, $email, $fname, $lname, $membershipid);

    /**
     * @permission anonymous
     * @param $email
     * @return mixed
     */
    public function RequestPasswordReset($email);

    /**
     * @permission anonymous
     * @param $token
     * @param $password
     * @return mixed
     */
    public function ResetPassword($token, $password);

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetUsers();

    /**
     * @permission administrator|grants
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListUsers($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator|user
     * @param $userid
     * @return mixed
     */
    public function GetUser($userid);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $password
     */
    public function UpdatePassword($userid, $password);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $subscribe
     */
    public function UpdateNewsletter($userid, $subscribe);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $username
     */
    public function UpdateUsername($userid, $username);

    /**
     * @permission administrator|full-profile
     * @param $userid
     * @param $fname
     * @param $lname
     * @return mixed
     */
    public function UpdateName($userid, $fname, $lname);

    /**
     * @permission administrator|full-profile
     * @param $userid
     * @param $email
     * @return mixed
     */
    public function UpdateEmail($userid, $email);

    /**
     * @permission administrator|full-profile
     * @param $userid
     * @param $email
     * @return mixed
     */
    public function UpdatePaymentEmail($userid, $email);

    /**
     * @permission administrator
     * @param $userid
     * @param $cash
     * @return mixed
     */
    public function UpdateCash($userid, $cash);

    /**
     * @permission administrator
     * @param $userid
     * @param $privileges
     */
    public function PutUserPrivileges($userid, $privileges);

    /**
     * @permission administrator
     * @param $userid
     * @param $membershipid
     * @return mixed
     */
    public function UpdateMembership($userid, $membershipid);

    /**
     * @permission administrator
     * @param $userid
     * @param $status
     * @return mixed
     */
    public function UpdateStatus($userid, $status);

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetStatuses();

    /**
     * @permission administrator
     * @param $userid
     * @param $date
     * @return mixed
     */
    public function UpdateExpiry($userid, $date);

    /**
     * @permission user|administrator
     * @param $userid
     * @return mixed
     */
    public function GetStanding($userid);

    /**
     * @permission grants
     * @param $userid
     * @return mixed
     */
    public function GetGrantUserPrivileges($userid);

    /**
     * @permission grants
     * @param $userid
     * @param $privilege
     * @return mixed
     */
    public function GrantPrivilege($userid, $privilege);

    /**
     * @permission grants
     * @param $userid
     * @param $privilege
     * @return mixed
     */
    public function RevokePrivilege($userid, $privilege);
}