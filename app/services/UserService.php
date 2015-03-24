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
use app\domain\Privilege;
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
        if (CurrentUser::getIdentity() != $userid || CurrentUser::hasAnyPermissions("administrator") != true) {
            return;
        }

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

    public function UpdateProfile($userid, $username, $newsletter) {
        $user = $this->GetUser($userid);

        $user->username = $username;
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
        $user = User::findByEmail($email)[0];
        if(is_null($user)) {
            return [ "success" => false, "msg" => "Unable to find a user by that e-mail address" ];
        }

        $request = new PasswordResetRequest();

        $request->token = bin2hex(openssl_random_pseudo_bytes(8));
        $request->userid = $user->id;

        $request->save();

        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'].'/';

        $emailService = new EmailService();
        $emailService->EmailUser($user, 'MMP Password Recovery', 'recover', [
            'token' => $request->token,
            'host' => $protocol.$domainName
        ]);
        return [ "success" => true ];
    }

    public function ResetPassword($token, $password) {

        $request = PasswordResetRequest::findByToken($token)[0];

        if(!is_null($request)) {
            $created = new DateTime($request->created);
            $userid = $request->userid;

            $request->delete();
            $created->modify("+2 hours");
            if ($created > new DateTime()) {

                $user = User::find($userid);

                if (!is_null($user)) {
                    $user->password = PasswordUtil::hash($password);
                    $user->save();

                    return ["success" => true ];
                }
            }
        }
        return [ "success" => false, "msg" => "Invalid Token" ];
    }

    public function PutUserPrivileges($userid, $privileges) {
        $user = User::find($userid);

        $privArray = $privileges;

        if(!is_array($privArray)) {
            $privArray = explode(",", $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        foreach($user->privileges->all() as $priv)
            $user->privileges->remove($priv);

        foreach($privs as $priv)
            $user->privileges->add($priv);

        $user->save();
    }
}