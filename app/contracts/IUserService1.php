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
     * @param $fname
     * @param $lname
     * @param $email
     * @param $newsletter
     */
    public function UpdateProfile($userid, $username, $fname, $lname, $email, $newsletter);
}