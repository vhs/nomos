<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 2:51 PM
 */

namespace app\services;


use app\contracts\IUserService1;
use app\domain\Key;
use app\domain\Membership;
use app\domain\User;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;

class UserService implements IUserService1 {

    public function GetUsers() {
        return User::findAll();
    }

    public function GetUser($id) {
        if (CurrentUser::getIdentity() == $id || CurrentUser::hasAnyPermissions("administrator"))
            return User::find($id);

        return null;
    }
}