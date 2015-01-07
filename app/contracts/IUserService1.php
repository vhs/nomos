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
     * @permission authenticated
     * @return mixed
     */
    public function GetUsers();

    /**
     * @permission authenticated
     * @param $id
     * @return mixed
     */
    public function GetUser($id);
}