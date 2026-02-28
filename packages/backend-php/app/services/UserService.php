<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 2:51 PM.
 */

namespace app\services;

use app\constants\StringLiterals;
use app\contracts\IUserService1;
use app\domain\Membership;
use app\domain\PasswordResetRequest;
use app\domain\Privilege;
use app\domain\User;
use app\dto\UserActiveEnum;
use app\exceptions\InvalidInputException;
use app\exceptions\InvalidPasswordHashException;
use app\exceptions\UserAlreadyExistsException;
use app\security\PasswordUtil;
use DateTime;
use vhs\security\CurrentUser;
use vhs\services\Service;

/** @typescript */
class UserService extends Service implements IUserService1 {
    /**
     * @permission administrator|grants
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function CountUsers($filters) {
        return User::count($filters, $this->AllowedColumns());
    }

    /**
     * @permission administrator
     *
     * @param string $username
     * @param string $password
     * @param string $email
     * @param string $fname
     * @param string $lname
     * @param int    $membershipid
     *
     * @throws \app\exceptions\InvalidPasswordHashException
     * @throws \app\exceptions\UserAlreadyExistsException
     *
     * @return mixed
     */
    public function Create($username, $password, $email, $fname, $lname, $membershipid) {
        if (User::exists($username, $email)) {
            // $this->context->log("whatever");
            throw new UserAlreadyExistsException();
        }

        $hashedPassword = PasswordUtil::hash($password);

        if ($hashedPassword === null) {
            throw new InvalidPasswordHashException();
        }

        $user = new User();

        $user->username = $username;
        $user->password = $hashedPassword;
        $user->email = $email;
        $user->payment_email = $email;
        $user->stripe_email = $email;
        $user->fname = $fname;
        $user->lname = $lname;
        $user->active = UserActiveEnum::PENDING->value;
        $user->token = bin2hex(openssl_random_pseudo_bytes(8));

        $user->save();

        try {
            $this->UpdateMembership($user->id, $membershipid);
        } catch (\Exception $ex) {
            // Ignore result
        }

        $protocol =
            (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443
                ? StringLiterals::HTTPS_PREFIX
                : StringLiterals::HTTP_PREFIX;
        $domainName = $_SERVER['HTTP_HOST'] . '/';

        $emailService = new EmailService();

        $emailService->EmailUser($user, 'welcome', [
            'token' => $user->token,
            'host' => $protocol . $domainName
        ]);

        return $user;
    }

    /**
     * @permission grants
     *
     * @param int $userid
     *
     * @return mixed
     */
    public function GetGrantUserPrivileges($userid) {
        /** @var User $user */
        $user = User::find($userid);

        if ($user == null) {
            return [];
        }

        if (CurrentUser::canGrantAllPermissions('*')) {
            return $user->getPrivilegeCodes();
        }

        $me = User::find(CurrentUser::getIdentity());

        return array_intersect($user->getPrivilegeCodes(), $me->getGrantCodes());
    }

    /**
     * @permission user|administrator
     *
     * @param int $userid
     *
     * @return mixed
     */
    public function GetStanding($userid) {
        $user = $this->GetUser($userid);

        if (is_null($user)) {
            return false;
        }

        return new DateTime($user->mem_expire) > new DateTime();
    }

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetStatuses() {
        return [
            ['title' => 'Active', 'code' => 'y'],
            ['title' => 'Pending', 'code' => 't'],
            ['title' => 'Inactive', 'code' => 'n'],
            ['title' => 'Banned', 'code' => 'b']
        ];
    }

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return mixed
     */
    public function GetUser($userid) {
        if (CurrentUser::getIdentity() == $userid || CurrentUser::hasAnyPermissions('administrator')) {
            return User::find($userid);
        }

        return null;
    }

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetUsers() {
        return User::findAll();
    }

    /**
     * @permission grants
     *
     * @param int    $userid
     * @param string $privilege
     *
     * @return mixed
     */
    public function GrantPrivilege($userid, $privilege) {
        if (!CurrentUser::canGrantAllPermissions($privilege)) {
            return;
        }

        $user = User::find($userid);

        if ($user == null) {
            return;
        }

        /** @var Privilege $priv */
        $priv = Privilege::findByCode($privilege);

        if ($priv == null) {
            return;
        }

        // TODO fix typing
        /** @disregard P1006 override */
        foreach ($user->privileges->all() as $p) {
            if ($p->code == $priv->code) {
                return;
            }
        }

        // TODO fix typing
        /** @disregard P1006 override */
        $user->privileges->add($priv);
        $user->save();
    }

    /**
     * @permission administrator|grants
     *
     * @param int                            $page
     * @param int                            $size
     * @param string                         $columns
     * @param string                         $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function ListUsers($page, $size, $columns, $order, $filters) {
        return User::page($page, $size, $columns, $order, $filters, $this->AllowedColumns());
    }

    /**
     * @permission administrator
     *
     * @param int    $userid
     * @param string $privileges
     *
     * @return void
     */
    public function PutUserPrivileges($userid, $privileges) {
        $user = User::find($userid);

        $privArray = is_string($privileges) ? explode(',', $privileges) : $privileges;

        $privs = Privilege::findByCodes(...$privArray);

        // TODO fix typing
        /** @disregard P1006 override */
        foreach ($user->privileges->all() as $priv) {
            // TODO fix typing
            /** @disregard P1006 override */
            $user->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            // TODO fix typing
            /** @disregard P1006 override */
            $user->privileges->add($priv);
        }

        $user->save();
    }

    /**
     * @permission anonymous
     *
     * @param string $username
     * @param string $password
     * @param string $email
     * @param string $fname
     * @param string $lname
     *
     * @throws \app\exceptions\InvalidPasswordHashException
     * @throws \app\exceptions\UserAlreadyExistsException
     *
     * @return mixed
     */
    public function Register($username, $password, $email, $fname, $lname) {
        if (User::exists($username, $email)) {
            throw new UserAlreadyExistsException();
        }

        $hashedPassword = PasswordUtil::hash($password);

        if ($hashedPassword === null) {
            throw new InvalidPasswordHashException();
        }

        $user = new User();

        $user->username = $username;
        $user->password = $hashedPassword;
        $user->email = $email;
        $user->fname = $fname;
        $user->lname = $lname;
        $user->active = UserActiveEnum::PENDING->value;
        $user->token = bin2hex(openssl_random_pseudo_bytes(8));

        $user->save();

        $protocol =
            (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443
                ? StringLiterals::HTTPS_PREFIX
                : StringLiterals::HTTP_PREFIX;
        $domainName = $_SERVER['HTTP_HOST'] . '/';

        $emailService = new EmailService();

        $emailService->EmailUser($user, 'welcome', [
            'token' => $user->token,
            'host' => $protocol . $domainName
        ]);

        return $user;
    }

    /**
     * @permission anonymous
     *
     * @param string $email
     *
     * @return mixed
     */
    public function RequestPasswordReset($email) {
        $user = User::findByEmail($email)[0];
        if (is_null($user)) {
            return ['success' => false, 'msg' => 'Unable to find a user by that e-mail address'];
        }

        $request = new PasswordResetRequest();

        $request->token = bin2hex(openssl_random_pseudo_bytes(8));
        $request->userid = $user->id;

        $request->save();

        $protocol =
            (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443
                ? StringLiterals::HTTPS_PREFIX
                : StringLiterals::HTTP_PREFIX;
        $domainName = $_SERVER['HTTP_HOST'] . '/';

        $emailService = new EmailService();
        $emailService->EmailUser($user, 'recover', [
            'token' => $request->token,
            'host' => $protocol . $domainName
        ]);

        return ['success' => true];
    }

    /**
     * @permission user
     *
     * @param string $email
     *
     * @return mixed
     */
    public function RequestSlackInvite($email) {
        $url = 'https://' . SLACK_URL . '/api/users.admin.invite';

        $body = [
            'email' => $email,
            'token' => SLACK_INVITE_TOKEN,
            'set_active' => true
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($body));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_FORBID_REUSE, true);
        
        $error = null;
        $response = curl_exec($ch);

        if (!$response) {
            $error = 'Error: Got ' . curl_error($ch) . " when request slack invite for email: '" . $email . "'";
        }

        curl_close($ch);

        if (!is_null($error)) {
            // $this->context->log($error);
            return $error;
        }

        $json_data = json_decode($response, true);
        // body looks like:
        //   {"ok":true}
        //       or
        //   {"ok":false,"error":"already_invited"}

        if ($json_data['ok']) {
            return 'Invite sent';
        }

        $ErrorMap = [
            'invalid_email' => 'The email you entered is an invalid email.',
            'invalid_auth' => 'Something has gone wrong. Please contact a system administrator.'
        ];

        $error = $json_data['error'];

        if ($error == 'already_invited' || $error == 'already_in_team') {
            return 'Success! You were already invited.<br>Visit <a href="https://' . SLACK_URL . '">' . SLACK_URL . '</a>';
        }

        $error = $ErrorMap[$error] ?? $error;

        return $error;
    }

    /**
     * @permission anonymous
     *
     * @param string $token
     * @param string $password
     *
     * @throws \app\exceptions\InvalidPasswordHashException
     *
     * @return mixed
     */
    public function ResetPassword($token, $password) {
        $requests = PasswordResetRequest::findByToken($token);

        if (!is_null($requests) && count($requests) == 1) {
            /** @var PasswordResetRequest $request */
            $request = $requests[0];
            $created = new DateTime($request->created);
            $userid = $request->userid;

            $request->delete();
            $created->modify('+2 hours');
            if ($created > new DateTime()) {
                $user = User::find($userid);

                if (!is_null($user)) {
                    $hashedPassword = PasswordUtil::hash($password);

                    if ($hashedPassword === null) {
                        throw new InvalidPasswordHashException();
                    }

                    $user->password = $hashedPassword;

                    $user->save();

                    return ['success' => true];
                }
            }
        } else {
            $users = User::findByToken($token);

            if (!is_null($users) && count($users) == 1) {
                $user = $users[0];

                $hashedPassword = PasswordUtil::hash($password);

                if ($hashedPassword === null) {
                    throw new InvalidPasswordHashException();
                }

                $user->token = null;

                $user->password = $hashedPassword;
                $user->save();

                return ['success' => true];
            }
        }

        return ['success' => false, 'msg' => 'Invalid Token'];
    }

    /**
     * @permission grants
     *
     * @param int    $userid
     * @param string $privilege
     *
     * @return void
     */
    public function RevokePrivilege($userid, $privilege) {
        if (!CurrentUser::canGrantAllPermissions($privilege)) {
            return;
        }

        $user = User::find($userid);

        if ($user == null) {
            return;
        }

        $priv = Privilege::findByCode($privilege);

        if ($priv == null) {
            return;
        }

        $remove = null;

        // TODO fix typing
        /** @disregard P1006 override */
        foreach ($user->privileges->all() as $p) {
            if ($p->code == $priv->code) {
                $remove = $p;
            }
        }

        if (!is_null($remove)) {
            // TODO fix typing
            /** @disregard P1006 override */
            $user->privileges->remove($remove);
            $user->save();
        }
    }

    /**
     * @permission administrator
     *
     * @param int  $userid
     * @param bool $cash
     *
     * @return void
     */
    public function UpdateCash($userid, $cash) {
        $user = User::find($userid);

        if (is_null($user)) {
            return;
        }

        $user->cash = boolval($cash);

        $user->save();
    }

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @return void
     */
    public function UpdateEmail($userid, $email) {
        $user = $this->GetUser($userid);

        if (is_null($user) || CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            return;
        }

        $user->email = $email;

        $user->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $userid
     * @param string $date
     *
     * @return mixed
     */
    public function UpdateExpiry($userid, $date) {
        $user = User::find($userid);

        if (is_null($user)) {
            return;
        }

        $user->mem_expire = (new DateTime($date))->format('Y-m-d H:i:s');

        $user->save();
    }

    /**
     * @permission administrator
     *
     * @param int $userid
     * @param int $membershipid
     *
     * @throws \app\exceptions\InvalidInputException
     *
     * @return mixed
     */
    public function UpdateMembership($userid, $membershipid) {
        /** @var User|null */
        $user = User::find($userid);

        /** @var Membership|null */
        $membership = Membership::find($membershipid);

        if (is_null($user) || is_null($membership)) {
            throw new InvalidInputException('Invalid user or membership type');
        }

        $user->membership = $membership;

        $user->save();
    }

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $fname
     * @param string $lname
     *
     * @return mixed
     */
    public function UpdateName($userid, $fname, $lname) {
        $user = $this->GetUser($userid);

        if (is_null($user) || CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            return;
        }

        $user->fname = $fname;
        $user->lname = $lname;

        $user->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int  $userid
     * @param bool $subscribe
     *
     * @return void
     */
    public function UpdateNewsletter($userid, $subscribe) {
        $user = $this->GetUser($userid);

        if (is_null($user)) {
            return;
        }

        $user->newsletter = $subscribe ? true : false;

        $user->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $password
     *
     * @throws \app\exceptions\InvalidPasswordHashException
     */
    public function UpdatePassword($userid, $password) {
        $user = $this->GetUser($userid);

        if (is_null($user)) {
            return;
        }

        $hashedPassword = PasswordUtil::hash($password);

        if ($hashedPassword === null) {
            throw new InvalidPasswordHashException();
        }

        $user->password = $hashedPassword;

        $user->save();
    }

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @return void
     */
    public function UpdatePaymentEmail($userid, $email) {
        $user = $this->GetUser($userid);

        if (is_null($user) || CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            return;
        }

        $user->payment_email = $email;

        $user->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $userid
     * @param string $status
     *
     * @return mixed
     */
    public function UpdateStatus($userid, $status) {
        $user = $this->GetUser($userid);

        if (is_null($user) || CurrentUser::hasAnyPermissions('administrator') !== true) {
            return;
        }

        switch ($status) {
            case 'active':
            case 'y':
            case 'true':
                $status = 'y';

                break;
            case 'pending':
            case 't':
                $status = 't';

                break;
            case 'banned':
            case 'b':
                $status = 'b';

                break;
            default:
                $status = 'n';

                break;
        }

        $user->active = $status;

        $user->save();
    }

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @return void
     */
    public function UpdateStripeEmail($userid, $email) {
        $user = $this->GetUser($userid);

        if (is_null($user) || CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            return;
        }

        $user->stripe_email = $email;

        $user->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $username
     *
     * @return void
     */
    public function UpdateUsername($userid, $username) {
        $user = $this->GetUser($userid);

        if (is_null($user)) {
            return;
        }

        $user->username = $username;

        $user->save();
    }

    /**
     * AllowedColumns.
     *
     * @return string[]|null
     */
    protected function AllowedColumns() {
        if (CurrentUser::hasAnyPermissions('grants') && !CurrentUser::hasAnyPermissions('administrator')) {
            return ['id', 'username', 'fname', 'lname', 'email'];
        } else {
            return null;
        }
    }
}
