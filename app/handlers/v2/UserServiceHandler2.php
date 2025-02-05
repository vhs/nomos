<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 2:51 PM.
 */

namespace app\handlers\v2;

use app\constants\StringLiterals;
use app\contracts\v2\IUserService2;
use app\domain\Membership;
use app\domain\PasswordResetRequest;
use app\domain\Privilege;
use app\domain\User;
use app\dto\ServiceResponseError;
use app\dto\ServiceResponseErrorInvalidToken;
use app\dto\ServiceResponseErrorUserNotFoundByEmailAddress;
use app\dto\ServiceResponseSuccess;
use app\exceptions\InvalidInputException;
use app\exceptions\InvalidPasswordHashException;
use app\exceptions\UserAlreadyExistsException;
use app\security\PasswordUtil;
use DateTime;
use vhs\security\CurrentUser;
use vhs\services\Service;

/** @typescript */
class UserServiceHandler2 extends Service implements IUserService2 {
    /**
     * @permission administrator|grants
     *
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountUsers($filters): int {
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
     * @throws string
     *
     * @return \app\domain\User
     */
    public function Create($username, $password, $email, $fname, $lname, $membershipid): User {
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
        $user->payment_email = $email;
        $user->stripe_email = $email;
        $user->fname = $fname;
        $user->lname = $lname;
        $user->active = 't';
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

        $emailService2 = new EmailServiceHandler2();

        $emailService2->EmailUser($user, 'welcome', [
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
     * @throws string
     *
     * @return string[]
     */
    public function GetGrantUserPrivileges($userid): array {
        /** @var User $user */
        $user = $this->getUserById($userid);

        if (CurrentUser::canGrantAllPermissions('*')) {
            return $user->getPrivilegeCodes();
        }

        $me = $this->getUserById(CurrentUser::getIdentity());

        return array_intersect($user->getPrivilegeCodes(), $me->getGrantCodes());
    }

    /**
     * @permission user|administrator
     *
     * @param int $userid
     *
     * @throws string
     *
     * @return bool
     */
    public function GetStanding($userid): bool {
        $user = $this->getUserById($userid);

        return new DateTime($user->mem_expire) > new DateTime();
    }

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return mixed[]
     */
    public function GetStatuses(): array {
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
     * @throws string
     *
     * @return \app\domain\User|null
     */
    public function GetUser($userid): User|null {
        if (CurrentUser::getIdentity() == $userid || CurrentUser::hasAnyPermissions('administrator')) {
            return $this->getUserById($userid);
        }

        return null;
    }

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\User[]
     */
    public function GetUsers(): array {
        return User::findAll();
    }

    /**
     * @permission grants
     *
     * @param int    $userid
     * @param string $privilege
     *
     * @throws string
     *
     * @return bool
     */
    public function GrantPrivilege($userid, $privilege): bool {
        if (!CurrentUser::canGrantAllPermissions($privilege)) {
            return false;
        }

        $user = $this->getUserById($userid);

        /** @var Privilege $priv */
        $priv = Privilege::findByCode($privilege);

        if ($priv == null) {
            return false;
        }

        foreach ($user->privileges->all() as $p) {
            if ($p->code == $priv->code) {
                return false;
            }
        }

        $user->privileges->add($priv);

        return $user->save();
    }

    /**
     * @permission administrator|grants
     *
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @throws string
     *
     * @return \app\domain\User[]
     */
    public function ListUsers($page, $size, $columns, $order, $filters): array {
        return User::page($page, $size, $columns, $order, $filters, $this->AllowedColumns());
    }

    /**
     * @permission administrator
     *
     * @param int    $userid
     * @param string $privileges
     *
     * @throws string
     *
     * @return bool
     */
    public function PutUserPrivileges($userid, $privileges): bool {
        $user = $this->getUserById($userid);

        $privArray = $privileges;

        if (!is_array($privArray)) {
            $privArray = explode(',', $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($user->privileges->all() as $priv) {
            $user->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            $user->privileges->add($priv);
        }

        return $user->save();
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
     * @throws string
     *
     * @return \app\domain\User
     */
    public function Register($username, $password, $email, $fname, $lname): User {
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
        $user->active = 't';
        $user->token = bin2hex(openssl_random_pseudo_bytes(8));

        $user->save();

        $protocol =
            (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443
                ? StringLiterals::HTTPS_PREFIX
                : StringLiterals::HTTP_PREFIX;
        $domainName = $_SERVER['HTTP_HOST'] . '/';

        $emailService2 = new EmailServiceHandler2();

        $emailService2->EmailUser($user, 'welcome', [
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
     * @throws string
     *
     * @return \app\dto\ServiceResponseError|\app\dto\ServiceResponseSuccess
     */
    public function RequestPasswordReset($email): ServiceResponseSuccess|ServiceResponseError {
        $user = User::findByEmail($email)[0];

        if (is_null($user)) {
            return new ServiceResponseErrorUserNotFoundByEmailAddress();
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

        $emailService2 = new EmailServiceHandler2();
        $emailService2->EmailUser($user, 'recover', [
            'token' => $request->token,
            'host' => $protocol . $domainName
        ]);

        return new ServiceResponseSuccess();
    }

    /**
     * @permission user
     *
     * @param string $email
     *
     * @throws string
     *
     * @return bool|string|null
     */
    public function RequestSlackInvite($email): bool|string|null {
        $ch = curl_init('http://slack-invite:3000/invite');
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'email=' . $email);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Connection: Close']);

        $error = null;

        if (!($response = curl_exec($ch))) {
            $error = 'Error: Got ' . curl_error($ch) . " when request slack invite for email: '" . $email . "'";
        }

        curl_close($ch);

        if (!is_null($error)) {
            // $this->context->log($error); NOSONAR
            return $error;
        }

        return $response;
    }

    /**
     * @permission anonymous
     *
     * @param string $token
     * @param string $password
     *
     * @throws string
     *
     * @return \app\dto\ServiceResponseError|\app\dto\ServiceResponseSuccess
     */
    public function ResetPassword($token, $password): ServiceResponseSuccess|ServiceResponseError {
        $requests = PasswordResetRequest::findByToken($token);

        if (!is_null($requests) && count($requests) == 1) {
            /** @var PasswordResetRequest $request */
            $request = $requests[0];
            $created = new DateTime($request->created);
            $userid = $request->userid;

            $request->delete();
            $created->modify('+2 hours');
            if ($created > new DateTime()) {
                $user = $this->getUserById($userid);

                if (!is_null($user)) {
                    $hashedPassword = PasswordUtil::hash($password);

                    if ($hashedPassword === null) {
                        throw new InvalidPasswordHashException();
                    }

                    $user->password = $hashedPassword;

                    $user->save();

                    return new ServiceResponseSuccess();
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

                return new ServiceResponseSuccess();
            }
        }

        return new ServiceResponseErrorInvalidToken();
    }

    /**
     * @permission grants
     *
     * @param int    $userid
     * @param string $privilege
     *
     * @throws string
     *
     * @return bool
     */
    public function RevokePrivilege($userid, $privilege): bool {
        if (!CurrentUser::canGrantAllPermissions($privilege)) {
            return false;
        }

        $user = $this->getUserById($userid);

        if ($user == null) {
            return false;
        }

        $priv = Privilege::findByCode($privilege);

        if ($priv == null) {
            return false;
        }

        $remove = null;

        foreach ($user->privileges->all() as $p) {
            if ($p->code == $priv->code) {
                $remove = $p;
            }
        }

        if (is_null($remove)) {
            return false;
        }

        $user->privileges->remove($remove);

        return $user->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $userid
     * @param string $cash
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateCash($userid, $cash): bool {
        $user = $this->getUserById($userid);

        $user->cash = boolval($cash);

        return $user->save();
    }

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateEmail($userid, $email): bool {
        $user = $this->getUserById($userid);

        if (CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            $this->throwNotFound('User');
        }

        $user->email = $email;

        return $user->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $userid
     * @param string $date
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateExpiry($userid, $date): bool {
        $user = $this->getUserById($userid);

        $user->mem_expire = (new DateTime($date))->format('Y-m-d H:i:s');

        return $user->save();
    }

    /**
     * @permission administrator
     *
     * @param int $userid
     * @param int $membershipid
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateMembership($userid, $membershipid): bool {
        $user = $this->getUserById($userid);

        $membership = Membership::find($membershipid);

        if (is_null($membership)) {
            throw new InvalidInputException('Invalid user or membership type');
        }

        $user->membership = $membership;

        return $user->save();
    }

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $fname
     * @param string $lname
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateName($userid, $fname, $lname): bool {
        $user = $this->getUserById($userid);

        if (CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            $this->throwNotFound('User');
        }

        $user->fname = $fname;
        $user->lname = $lname;

        return $user->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $subscribe
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateNewsletter($userid, $subscribe): bool {
        $user = $this->getUserById($userid);

        $user->newsletter = $subscribe ? true : false;

        return $user->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $password
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdatePassword($userid, $password): bool {
        $user = $this->getUserById($userid);

        $hashedPassword = PasswordUtil::hash($password);

        if ($hashedPassword === null) {
            throw new InvalidPasswordHashException();
        }

        $user->password = $hashedPassword;

        return $user->save();
    }

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdatePaymentEmail($userid, $email): bool {
        $user = $this->getUserById($userid);

        if (CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            $this->throwNotFound('User');
        }

        $user->payment_email = $email;

        return $user->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $userid
     * @param string $status
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateStatus($userid, $status): bool {
        $user = $this->getUserById($userid);

        if (CurrentUser::hasAnyPermissions('administrator') !== true) {
            $this->throwNotFound('User');
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

        return $user->save();
    }

    /**
     * @permission administrator|full-profile
     *
     * @param int    $userid
     * @param string $email
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateStripeEmail($userid, $email): bool {
        $user = $this->getUserById($userid);

        if (CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            $this->throwNotFound('User');
        }

        $user->stripe_email = $email;

        return $user->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $username
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateUsername($userid, $username): bool {
        $user = $this->getUserById($userid);

        $user->username = $username;

        return $user->save();
    }

    /**
     * Summary of AllowedColumns.
     *
     * @throws string
     *
     * @return string[]|null
     */
    protected function AllowedColumns(): array|null {
        if (CurrentUser::hasAnyPermissions('grants') && !CurrentUser::hasAnyPermissions('administrator')) {
            return ['id', 'username', 'fname', 'lname', 'email'];
        } else {
            return null;
        }
    }

    /**
     * getUserById.
     *
     * @param mixed $id
     *
     * @throws string
     *
     * @return \app\domain\User
     */
    private function getUserById($id): User {
        $result = User::find($id);

        if (is_null($result)) {
            $this->throwNotFound('User');
        }

        return $result;
    }
}
