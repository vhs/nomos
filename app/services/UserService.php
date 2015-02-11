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
use app\domain\PasswordResetRequest;
use app\domain\User;
use app\security\PasswordUtil;
use DateTime;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

class UserService extends Service implements IUserService1 {

    public function GetUsers() {
        return User::findAll();
    }

    public function GetUser($userid) {
        if (CurrentUser::getIdentity() == $userid || CurrentUser::hasAnyPermissions("administrator"))
            return User::find($userid);

        return null;
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

    public function Register($username, $password, $email, $fname, $lname) {
        if (User::exists($username, $email))
            throw new \Exception("User already exists");

        $user = new User();

        $user->username = $username;
        $user->password = PasswordUtil::hash($password);
        $user->email = $email;
        $user->fname = $fname;
        $user->lname = $lname;
        $user->active = "y";//"t"; //TODO send email activation

        $user->save();

        return $user;
    }

    public function RequestPasswordReset($email) {
        $user = User::findByEmail($email);

        $request = new PasswordResetRequest();

        $request->token = bin2hex(openssl_random_pseudo_bytes(8));
        $request->userid = $user->id;

        $request->save();

        //TODO email token
    }

    public function ResetPassword($token, $password) {
        $request = PasswordResetRequest::findByToken($token);

        if(!is_null($request) && count($request) == 1) {
            $created = $request->created;
            $userid = $request->userid;

            $request->delete();

            if (date_add($created, "PT15M") > new DateTime()) {
                $user = User::find($userid);

                if (!is_null($user)) {
                    $user->password = PasswordUtil::hash($password);
                    $user->save();

                    return "Success";
                }
            }
        }

        throw new \Exception("Invalid token");
    }
}