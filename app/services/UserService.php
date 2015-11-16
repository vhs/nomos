<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 2:51 PM
 */

namespace app\services;


use app\contracts\IUserService1;
use app\domain\Membership;
use app\domain\PasswordResetRequest;
use app\domain\Privilege;
use app\domain\User;
use app\security\PasswordUtil;
use DateTime;
use vhs\security\CurrentUser;
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

    public function UpdateUsername($userid, $username) {
        $user = $this->GetUser($userid);

        if(is_null($user)) return;

        $user->username = $username;

        $user->save();
    }

    public function UpdateName($userid, $fname, $lname) {
        $user = $this->GetUser($userid);

        if(is_null($user) || CurrentUser::hasAnyPermissions("full-profile", "administrator") != true) return;

        $user->fname = $fname;
        $user->lname = $lname;

        $user->save();
    }

    public function UpdateEmail($userid, $email) {
        $user = $this->GetUser($userid);

        if(is_null($user) || CurrentUser::hasAnyPermissions("full-profile", "administrator") != true) return;

        $user->email = $email;

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
        $user->active = "t";
        $user->token = bin2hex(openssl_random_pseudo_bytes(8));

        $user->save();

        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'].'/';

        $emailService = new EmailService();

        //todo finish this template and add the supporting services to actual active the account
        $emailService->EmailUser($user, 'VHS Nomos Account Activation', 'welcome', [
            'token' => $user->token,
            'host' => $protocol.$domainName
        ]);

        return $user;
    }

    public function Create($username, $password, $email, $fname, $lname, $membershipid) {
        if (User::exists($username, $email)) {
            $this->context->log("wtf");
            throw new \Exception("User already exists");
        }

        $user = new User();

        $user->username = $username;
        $user->password = PasswordUtil::hash($password);
        $user->email = $email;
        $user->fname = $fname;
        $user->lname = $lname;
        $user->active = "t";
        $user->token = bin2hex(openssl_random_pseudo_bytes(8));

        $user->save();

        try {
            $this->UpdateMembership($user->id, $membershipid);
        } catch(\Exception $ex) {}

        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'].'/';

        $emailService = new EmailService();

        //todo finish this template and add the supporting services to actual active the account
        $emailService->EmailUser($user, 'VHS Nomos Account Activation', 'welcome', [
            'token' => $user->token,
            'host' => $protocol.$domainName
        ]);

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
        $emailService->EmailUser($user, 'Nomos Password Recovery', 'recover', [
            'token' => $request->token,
            'host' => $protocol.$domainName
        ]);
        return [ "success" => true ];
    }

    public function ResetPassword($token, $password) {

        $requests = PasswordResetRequest::findByToken($token);

        if(!is_null($requests) && count($requests) == 1) {
            /** @var PasswordResetRequest $request */
            $request = $requests[0];
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

    public function UpdateMembership($userid, $membershipid) {
        $user = User::find($userid);

        $membership = Membership::find($membershipid);

        if(is_null($user) || is_null($membership)) {
            throw new \Exception("Invalid user or membership type");
        }

        if ($membership->code == "key-holder" && !$user->privileges->contains(Privilege::findByCode("vetted")))
            return;

        $user->membership = $membership;

        $user->save();
    }

    /**
     * @permission administrator
     * @param $userid
     * @param $status
     * @return mixed
     */
    public function UpdateStatus($userid, $status)
    {
        $user = $this->GetUser($userid);

        if(is_null($user) || CurrentUser::hasAnyPermissions("administrator") != true) return;

        switch($status) {
            case "active":
            case "y":
            case "true":
                $status = "y";
                break;
            case "pending":
            case "t":
                $status = "t";
                break;
            case "banned":
            case "b":
                $status = "b";
                break;
            default:
                $status = "n";
                break;
        }

        $user->active = $status;

        $user->save();
    }

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetStatuses()
    {
        return array(
            array("title"=>"Active", "code"=>"y"),
            array("title"=>"Pending", "code"=>"t"),
            array("title"=>"Inactive", "code"=>"n"),
            array("title"=>"Banned", "code"=>"b")
        );
    }

    public function ListUsers($page, $size, $columns, $order, $filters)
    {
        return User::page($page, $size, $columns, $order, $filters);
    }
}
