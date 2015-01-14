<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 2:55 PM
 */

namespace app\contracts;


use vhs\services\IService;

interface IUserService1 extends IService {

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetUsers();

    /**
     * @permission authenticated
     * @param $id
     * @return mixed
     */
    public function GetUser($id);

    /**
     * @permission authenticated
     * @param $id
     * @return mixed
     */
    public function GetKey($id);

    /**
     * @permission authenticated
     * @param $userid
     * @param $password
     */
    public function UpdatePassword($userid, $password);

    /**
     * @permission authenticated
     * @param $userid
     * @param $subscribe
     */
    public function UpdateNewsletter($userid, $subscribe);
}