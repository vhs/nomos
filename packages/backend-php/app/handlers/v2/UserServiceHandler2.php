<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 2:51 PM.
 */

namespace app\handlers\v2;

use app\adapters\v2\EmailAdapter2;
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
use app\dto\UserActiveEnum;
use app\exceptions\InvalidInputException;
use app\exceptions\InvalidPasswordHashException;
use app\exceptions\UserAlreadyExistsException;
use app\security\PasswordUtil;
use DateTime;
use vhs\domain\exceptions\DomainException;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

/** @typescript */
class UserServiceHandler2 extends Service implements IUserService2 {
    /**
     * @permission administrator|grants
     *
     * @param \vhs\domain\Filter|null $filters
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
     * @throws \app\exceptions\InvalidPasswordHashException
     * @throws \app\exceptions\UserAlreadyExistsException
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

        EmailAdapter2::getInstance()->EmailUser($user, 'welcome', [
            'token' => $user->token,
            'host' => $protocol . $domainName
        ]);

        return $this->getUserById($user->id);
    }

    /**
     * @permission user|administrator
     *
     * @param int $userid
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
     * @return array
     *
     * @phpstan-ignore missingType.iterableValue
     */
    public function GetStatuses(): array {
        return [
            ['title' => 'Active', 'code' => UserActiveEnum::ACTIVE->value],
            ['title' => 'Pending', 'code' => UserActiveEnum::PENDING->value],
            ['title' => 'Inactive', 'code' => UserActiveEnum::INACTIVE->value],
            ['title' => 'Banned', 'code' => UserActiveEnum::BANNED->value]
        ];
    }

    /**
     * @permission administrator|user
     *
     * @param int $userid
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
     * Get the privileges that are grantable to the specified user by the user calling this service method.
     *
     * @permission grants
     *
     * @param int $userid
     *
     * @return array<string,string>|array<string>
     */
    public function GetUserGrantablePrivileges($userid): array {
        /** @var User $user */
        $user = $this->getUserById($userid);

        if (CurrentUser::canGrantAllPermissions('*')) {
            return $user->getPrivilegeCodes();
        }

        $me = $this->getUserById(CurrentUser::getIdentity());

        return array_intersect($user->getPrivilegeCodes(), $me->getGrantCodes());
    }

    /**
     * @permission administrator
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
     * @throws \vhs\domain\exceptions\DomainException
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return bool
     */
    public function GrantPrivilege($userid, $privilege): bool {
        if (!CurrentUser::canGrantAllPermissions($privilege)) {
            throw new UnauthorizedException('Current user is not allowed to grant this privilege.');
        }

        /** @var User $user */
        $user = $this->getUserById($userid);

        if ($user === null) {
            throw new DomainException('User not found');
        }

        /** @var Privilege $priv */
        $priv = Privilege::findByCode($privilege);

        if ($priv === null) {
            throw new DomainException('Privilege not found');
        }

        // TODO fix typing
        /** @disregard P1006 override */
        foreach ($user->privileges->all() as $p) {
            if ($p->code == $priv->code) {
                throw new DomainException('Privilege already granted');
            }
        }

        // TODO fix typing
        /** @disregard P1006 override */
        $user->privileges->add($priv);

        return $user->save();
    }

    /**
     * @permission administrator|grants
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
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
     * @return bool
     */
    public function PutUserPrivileges($userid, $privileges): bool {
        $user = $this->getUserById($userid);

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
     * @throws \app\exceptions\InvalidPasswordHashException
     * @throws \app\exceptions\UserAlreadyExistsException
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
        $user->active = UserActiveEnum::PENDING->value;
        $user->token = bin2hex(openssl_random_pseudo_bytes(8));

        $user->save();

        $protocol =
            (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443
                ? StringLiterals::HTTPS_PREFIX
                : StringLiterals::HTTP_PREFIX;
        $domainName = $_SERVER['HTTP_HOST'] . '/';

        EmailAdapter2::getInstance()->EmailUser($user, 'welcome', [
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
     * @return \app\dto\ServiceResponseError|\app\dto\ServiceResponseSuccess
     */
    public function RequestPasswordReset($email): ServiceResponseSuccess|ServiceResponseError {
        $user = User::findByEmail($email)[0];

        if ($user === null) {
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

        EmailAdapter2::getInstance()->EmailUser($user, 'recover', [
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
     * @return bool|string|null
     */
    public function RequestSlackInvite($email): bool|string|null {
        $ch = curl_init('http://slack-invite:3000/invite');
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'email=' . $email);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_FORBID_REUSE, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Connection: Close']);

        $error = null;

        if (!($response = curl_exec($ch))) {
            $error = 'Error: Got ' . curl_error($ch) . " when request slack invite for email: '" . $email . "'";
        }

        curl_close($ch);

        if (!($error === null)) {
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
     * @throws \app\exceptions\InvalidPasswordHashException
     *
     * @return \app\dto\ServiceResponseError|\app\dto\ServiceResponseSuccess
     */
    public function ResetPassword($token, $password): ServiceResponseSuccess|ServiceResponseError {
        $requests = PasswordResetRequest::findByToken($token);

        if (!($requests === null) && count($requests) == 1) {
            /** @var PasswordResetRequest $request */
            $request = $requests[0];
            $created = new DateTime($request->created);
            $userid = $request->userid;

            $request->delete();
            $created->modify('+2 hours');
            if ($created > new DateTime()) {
                $user = $this->getUserById($userid);

                $hashedPassword = PasswordUtil::hash($password);

                if ($hashedPassword === null) {
                    throw new InvalidPasswordHashException();
                }

                $user->password = $hashedPassword;

                $user->save();

                return new ServiceResponseSuccess();
            }
        } else {
            $users = User::findByToken($token);

            if (!($users === null) && count($users) == 1) {
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
     * @throws \vhs\domain\exceptions\DomainException
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return bool
     */
    public function RevokePrivilege($userid, $privilege): bool {
        if (!CurrentUser::canGrantAllPermissions($privilege)) {
            throw new UnauthorizedException('Current user is not allowed to grant this privilege.');
        }

        /** @var User $user */
        $user = $this->getUserById($userid);

        if ($user === null) {
            throw new DomainException('User not found');
        }

        /** @var Privilege $priv */
        $priv = Privilege::findByCode($privilege);

        if ($priv === null) {
            throw new DomainException('Privilege not found');
        }

        $remove = null;

        // TODO fix typing
        /** @disregard P1006 override */
        foreach ($user->privileges->all() as $p) {
            if ($p->code == $priv->code) {
                $remove = $p;
            }
        }

        if ($remove === null) {
            throw new DomainException('Privilege instance not found');
        }

        // TODO fix typing
        /** @disregard P1006 override */
        $user->privileges->remove($remove);

        return $user->save();
    }

    /**
     * @permission administrator
     *
     * @param int         $userid
     * @param bool|string $cash
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
     * @return bool
     */
    public function UpdateEmail($userid, $email): bool {
        $user = $this->getUserById($userid);

        if (CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            $this->throwNotFound();
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
     * @param int   $userid
     * @param mixed $membershipid
     *
     * @throws \app\exceptions\InvalidInputException
     *
     * @return bool
     */
    public function UpdateMembership($userid, $membershipid): bool {
        $user = $this->getUserById($userid);

        /** @var Membership|null */
        $membership = Membership::find($membershipid);

        if ($membership === null) {
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
     * @return bool
     */
    public function UpdateName($userid, $fname, $lname): bool {
        $user = $this->getUserById($userid);

        if (CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            $this->throwNotFound();
        }

        $user->fname = $fname;
        $user->lname = $lname;

        return $user->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int  $userid
     * @param bool $subscribe
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
     * @throws \app\exceptions\InvalidPasswordHashException
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
     * @return bool
     */
    public function UpdatePaymentEmail($userid, $email): bool {
        $user = $this->getUserById($userid);

        if (CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            $this->throwNotFound();
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
     * @return bool
     */
    public function UpdateStatus($userid, $status): bool {
        $user = $this->getUserById($userid);

        if (CurrentUser::hasAnyPermissions('administrator') !== true) {
            $this->throwNotFound();
        }

        switch ($status) {
            case 'active':
            case UserActiveEnum::ACTIVE->value:
            case 'true':
                $status = UserActiveEnum::ACTIVE->value;

                break;
            case 'pending':
            case UserActiveEnum::PENDING->value:
                $status = UserActiveEnum::PENDING->value;

                break;
            case 'banned':
            case UserActiveEnum::BANNED->value:
                $status = UserActiveEnum::BANNED->value;

                break;
            default:
                $status = UserActiveEnum::INACTIVE->value;

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
     * @return bool
     */
    public function UpdateStripeEmail($userid, $email): bool {
        $user = $this->getUserById($userid);

        if (CurrentUser::hasAnyPermissions('full-profile', 'administrator') !== true) {
            $this->throwNotFound();
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
     * @return \app\domain\User
     */
    private function getUserById($id): User {
        $result = User::find($id);

        if ($result === null) {
            $this->throwNotFound();
        }

        return $result;
    }
}
