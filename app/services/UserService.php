<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 2:51 PM
 */

namespace app\services;


use app\contracts\IUserService1;
use app\domain\User;

class UserService implements IUserService1 {

    public function GetUsers() {
        return User::findAll();
    }

    public function GetUser($id) {
        return User::find($id);
    }
}