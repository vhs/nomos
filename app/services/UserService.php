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
use app\security\PasswordUtil;
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

    public function GetKey($id) {
        $key = Key::find($id);

        return $key;
    }

    public function UpdatePassword($userid, $password) {
        $user = $this->GetUser($userid);

        if(is_null($user)) return;

        $user->password = PasswordUtil::hash($password);

        $user->save();
    }

    public function UpdateNewsletter($userid, $subscribe) {
        $user = $this->GetUser($userid);

        if(is_null($user)) return;

        $user->newsletter = ($subscribe) ? true : false;

        $user->save();
    }

    public function UpdateProfile($userid, $username, $fname, $lname, $email, $newsletter) {
        $user = $this->GetUser($userid);

        $user->username = $username;
        $user->fname = $fname;
        $user->lname = $lname;
        $user->email = $email;
        $user->newsletter = $newsletter;

        $user->save();

    }
}