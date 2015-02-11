<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 2:33 PM
 */

namespace app\contracts;


use vhs\services\IContract;

interface IPrivilegeService1 extends IContract {

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetAllSystemPermissions();

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetAllPrivileges();

    /**
     * @permission administrator|user
     * @param $userid
     * @return mixed
     */
    public function GetUserPrivileges($userid);
}