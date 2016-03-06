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
use vhs\database\Column;
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

    public function UpdatePaymentEmail($userid, $email) {
        $user = $this->GetUser($userid);

        if(is_null($user) || CurrentUser::hasAnyPermissions("full-profile", "administrator") != true) return;

        $user->payment_email = $email;

        $user->save();
    }

    public function UpdateCash($userid, $cash) {
        $user = User::find($userid);

        if (is_null($user)) return;

        $user->cash = boolval($cash);

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

        $emailService->EmailUser($user, 'welcome', [
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
        $user->payment_email = $email;
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

        $emailService->EmailUser($user, 'welcome', [
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
        $emailService->EmailUser($user, 'recover', [
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

        if ($membership->code == Membership::KEYHOLDER && !$user->privileges->contains(Privilege::findByCode("vetted"))) {
            $this->UpdateStatus($user->id, "pending");
            $user = User::find($userid);
        }

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
        return User::page($page, $size, $columns, $order, $filters,
            (CurrentUser::hasAnyPermissions("grants") && !CurrentUser::hasAnyPermissions("administrator")) ?
            ["id", "username", "fname", "lname", "email"] : []
        );
    }

    /**
     * @permission administrator
     * @param $userid
     * @param $date
     * @return mixed
     */
    public function UpdateExpiry($userid, $date)
    {
        $user = User::find($userid);

        if (is_null($user))
            return;

        $user->mem_expire = (new DateTime($date))->format("Y-m-d H:i:s");

        $user->save();
    }

    public function GetStanding($userid) {
        $user = $this->GetUser($userid);

        if (is_null($user)) return false;

        return new DateTime($user->mem_expire) > new DateTime();
    }

    /**
     * @permission grants
     * @param $userid
     * @param $privilege
     * @return mixed
     */
    public function GrantPrivilege($userid, $privilege)
    {
        if(!CurrentUser::canGrantAllPermissions($privilege))
            return;

        $user = User::find($userid);

        if ($user == null)
            return;

        /** @var Privilege $priv */
        $priv = Privilege::findByCode($privilege);

        if ($priv == null)
            return;

        foreach($user->privileges->all() as $p) {
            if ($p->code == $priv->code)
                return;
        }

        $user->privileges->add($priv);
        $user->save();
    }

    /**
     * @permission grants
     * @param $userid
     * @param $privilege
     * @return mixed
     */
    public function RevokePrivilege($userid, $privilege)
    {
        if(!CurrentUser::canGrantAllPermissions($privilege))
            return;

        $user = User::find($userid);

        if ($user == null)
            return;

        $priv = Privilege::findByCode($privilege);

        if ($priv == null)
            return;

        $remove = null;

        foreach($user->privileges->all() as $p) {
            if ($p->code == $priv->code)
                $remove = $p;
        }

        if (!is_null($remove)) {
            $user->privileges->remove($remove);
            $user->save();
        }
    }

    /**
     * @permission grants
     * @param $userid
     * @return mixed
     */
    public function GetGrantUserPrivileges($userid)
    {
        /** @var User $user */
        $user = User::find($userid);

        if ($user == null)
            return [];

        if (CurrentUser::canGrantAllPermissions("*"))
            return $user->getPrivilegeCodes();

        $me = User::find(CurrentUser::getIdentity());

        return array_intersect($user->getPrivilegeCodes(), $me->getGrantCodes());
    }

    public function Compare($useridA, $useridB) {
        $userA = $this->GetUser($useridA);
        $userB = $this->GetUser($useridB);

        $result = array();

        /** @var Column $column */
        foreach(User::Schema()->Columns()->all() as $column) {
            $col = $column->name;

            $result[$col] = [
                "a" => $userA->$col,
                "equal" => ($userA->$col === $userB->$col),
                "b" => $userB->$col
            ];
        }

        //TODO compare dependent sub objects, either via the domain relationships on the user domain or manually.
        // ideally we'd have a way to automatically get all of the depend relationships to userid across all schema
        // classes so that if new stuff is made it is included properly in the compare and merge functions.

        return $result;
    }


    /**
     * Merge original and annexe keeping only fields from annexe as listed in criterion.
     *
     * @permission administrator
     * @param $originalId
     * @param $annexeId
     * @param $new - create a new third object with the result otherwise merge into original
     * @param $keep - keep the original and annexe objects otherwise delete annexe or both depending on $new
     * @param $criterion - list of fields to use from the annexe
     * @return mixed
     *
     *  new &  keep = creates a new user and keeps both original and annexe
     * !new &  keep = merges annexe into original but keeps the annexe
     * !new & !keep = merges annexe into original and deletes the annexe
     *  new & !keep = creates a new user but deletes both original and annexe
     *
     */
    public function Merge($originalId, $annexeId, $new, $keep, $criterion)
    {
        // TODO: Implement Merge() method.
        // criterion is likely not useful for domain relatated objects. I think the rule should be to simply update
        //  all relationships with the $new user ID or the original user ID depending on the $new flag - in the event of
        //  a conflict we take the $original. This is especially true for child owned relationships.

        // It will be complicated/difficult to update loosely coupled child related objects in an automatic way, if at all
        //  such as AccessLog or Payment records. Perhaps we need to define some relationship types as optional so they
        //  don't hydrate automatically. This way we could define loose schema relationships for the purposes of reflection
        //  but not create a hard constraint.

        // In the case of Payment records or AccessLog records we record an optional userId.. Domain objects hydrate relationships
        //  automatically and strictly. If it is an optional relationship (ie. nullable or stale (deleted object)) then
        //  the hydrate could fail. Also we probably don't care to actually hydrate them anyway but having the relationship
        //  defined would allow us to reflect and discover dependencies holistically.


    }
}
