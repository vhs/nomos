<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 2:51 PM
 */

namespace app\services;


use app\contracts\IUserService1;

class UserService implements IUserService1 {

    public function GetUsers() {
        return "hello world";
    }

    public function GetUser($id) {
        return "blah";
    }
}