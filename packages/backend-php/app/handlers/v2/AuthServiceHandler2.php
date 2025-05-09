<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:30 PM.
 */

namespace app\handlers\v2;

use app\constants\StringLiterals;
use app\contracts\v2\IAuthService2;
use app\domain\AccessLog;
use app\domain\Key;
use app\domain\User;
use app\dto\TrimmedUser;
use app\schema\UserSchema;
use app\security\Authenticate;
use app\security\credentials\PinCredentials;
use app\security\UserPrincipal;
use app\utils\AuthCheckResult;
use vhs\database\Database;
use vhs\database\queries\QuerySelect;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\Filter;
use vhs\exceptions\HttpException;
use vhs\security\AnonPrincipal;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\security\IPrincipal;
use vhs\security\UserPassCredentials;
use vhs\services\Service;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class AuthServiceHandler2 extends Service implements IAuthService2 {
    /**
     * fill retVal from User result.
     *
     * @param \app\domain\Key            &$key
     * @param \app\domain\User|null      &$user
     * @param \app\utils\AuthCheckResult &$retval
     *
     * @return bool
     */
    private static function parseValidAccount(&$key, &$user, &$retval): bool {
        if (!is_null($user) && $user instanceof User && $user->valid) {
            $retval->valid = true;
            $retval->userId = $user->id;
            $retval->username = $user->username;
            $retval->type = $user->membership->code;
            $retval->privileges = $key->getAbsolutePrivileges();

            return true;
        } elseif (!is_null($user) && $user instanceof User) {
            $retval->username = $user->username;
            $retval->message = $user->getInvalidReason();
        } else {
            $retval->username = 'unknown';
            $retval->message = 'Null user';
        }

        return false;
    }

    /**
     * Check to see if the user pin and account is valid.
     *
     * @permission administrator|pin-auth
     *
     * @param string $pin
     *
     * @return \app\utils\AuthCheckResult
     */
    public function CheckPin($pin): AuthCheckResult {
        // pin magic
        // TODO: documentation
        $pin = str_replace('|', '', $pin);

        $intpin = intval($pin);

        $pinid = intval($intpin / 10000);

        $pin = $intpin - $pinid * 10000;

        $pinid = sprintf('%04s', $pinid);
        $pin = sprintf('%04s', $pin);

        // Set defaults
        $retval = new AuthCheckResult();

        // Find key by pin
        /** @var \app\domain\Key[] */
        $keys = Key::findByPin($pinid . '|' . $pin);

        $logAccess = function ($granted, $userid = null) use ($pinid, $pin) {
            try {
                AccessLog::log($pinid . '|' . $pin, 'pin', $granted, $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN', $userid);
            } catch (\Exception $ex) {
                /*mmm*/
            }
        };

        // If we get an invalid result, log and fail (we should always only get one result)
        if (count($keys) != 1) {
            $logAccess(false);

            return $retval;
        }

        // Get key
        $key = $keys[0];

        // If missing userid, log and fail
        if ($key->userid == null) {
            $logAccess(false);

            return $retval;
        }

        // Fetch userinfo
        $user = User::find($key->userid);

        // Check if we have a user from the key
        if ($user == null || !$user instanceof User) {
            $logAccess(false);

            return $retval;
        }

        // Check if account is active and in good standing, and return result set
        $isValid = self::parseValidAccount($key, $user, $retval);

        // Log
        $logAccess($isValid, $user->id);

        // Return
        return $retval;
    }

    /**
     * @permission administrator|rfid-auth
     *
     * @param string $rfid
     *
     * @return \app\utils\AuthCheckResult
     */
    public function CheckRfid($rfid): AuthCheckResult {
        // Set defaults
        $retval = new AuthCheckResult();

        // Find key by RFID card id
        $keys = Key::findByRfid($rfid);

        $logAccess = function ($granted, $userid = null) use ($rfid) {
            try {
                AccessLog::log('rfid', $rfid, $granted, $_SERVER['REMOTE_ADDR'], $userid);
            } catch (\Exception $ex) {
                /*mmm*/
            }
        };

        // If we get an invalid result, log and fail (we should always only get one result)
        if (count($keys) != 1) {
            $logAccess(false);

            return $retval;
        }

        // Fetch key
        $key = $keys[0];

        // Check if there's a userid attached to the key, else fail
        if ($key->userid == null) {
            $logAccess(false);

            return $retval;
        }

        // Fetch userinfo
        $user = User::find($key->userid);

        // Check if we have a user from the key
        if ($user == null || !$user instanceof User) {
            $logAccess(false);

            return $retval;
        }

        // Check if account is active and in good standing, and return result set
        $isValid = self::parseValidAccount($key, $user, $retval);

        // Log
        $logAccess($isValid, $user->id);

        // Return
        return $retval;
    }

    /**
     * Check to see if the user service/id is valid. A service could be github/slack/google.
     *
     * @permission administrator|service-auth
     *
     * @param string $service
     * @param string $id
     *
     * @return \app\utils\AuthCheckResult
     */
    public function CheckService($service, $id): AuthCheckResult {
        // Set defaults
        $retval = new AuthCheckResult();

        // Always parse service names as lowercase
        $service = strtolower($service);

        // Find service key
        $keys = Key::findByService($service, $id);

        $logAccess = function ($granted, $userid = null) use ($service, $id) {
            try {
                AccessLog::log($id, $service, $granted, $_SERVER['REMOTE_ADDR'], $userid);
            } catch (\Exception $ex) {
                /*mmm*/
            }
        };

        // If we get an invalid result, log and fail (we should always only get one result)
        if (count($keys) != 1) {
            $logAccess(false);

            return $retval;
        }

        // Fetch key
        $key = $keys[0];

        // Check if there's a userid attached to the key, else fail
        if ($key->userid == null) {
            $logAccess(false);

            return $retval;
        }

        // Fetch userinfo
        $user = User::find($key->userid);

        // Check if we have a user from the key
        if ($user == null || !$user instanceof User) {
            $logAccess(false);

            return $retval;
        }

        // Check if account is active and in good standing, and return result set
        $isValid = self::parseValidAccount($key, $user, $retval);

        // Log
        $logAccess($isValid, $user->id);

        // Return
        return $retval;
    }

    /**
     * @permission anonymous
     *
     * @param string $username
     *
     * @return bool
     */
    public function CheckUsername($username): bool {
        return Database::exists(
            new QuerySelect(UserSchema::Table(), UserSchema::Column('username'), Where::Equal(UserSchema::Column('username'), $username))
        );
    }

    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountAccessLog($filters): int {
        return AccessLog::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountUserAccessLog($userid, $filters): int {
        $filters = $this->addUserIDToFilters($userid, $filters);

        return AccessLog::count($filters);
    }

    /**
     * @permission anonymous
     *
     * @return \app\security\UserPrincipal|\vhs\security\AnonPrincipal|\vhs\security\IPrincipal
     */
    public function CurrentUser(): IPrincipal|UserPrincipal|AnonPrincipal {
        return CurrentUser::getPrincipal();
    }

    /**
     * @permission oauth-provider
     *
     * @param string $username
     * @param string $password
     *
     * @return \app\dto\TrimmedUser|null
     */
    public function GetUser($username, $password): TrimmedUser|null {
        return $this->trimUser(Authenticate::authenticateOnly($username, $password));
    }

    /**
     * @permission administrator
     *
     * @param int                            $page
     * @param int                            $size
     * @param string                         $columns
     * @param string                         $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return \app\domain\AccessLog[]
     */
    public function ListAccessLog($page, $size, $columns, $order, $filters): array {
        return AccessLog::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param int                     $userid
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\AccessLog[]
     */
    public function ListUserAccessLog($userid, $page, $size, $columns, $order, $filters): array {
        $filters = $this->addUserIDToFilters($userid, $filters);

        return AccessLog::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission anonymous
     *
     * @param string $username
     * @param string $password
     *
     * @return string
     */
    public function Login($username, $password): string {
        try {
            Authenticate::getInstance()->login(new UserPassCredentials($username, $password));
        } catch (\Exception $ex) {
            return $ex->getMessage();
        }

        return StringLiterals::AUTH_ACCESS_GRANTED;
    }

    /**
     * @permission user
     *
     * @return void
     */
    public function Logout(): void {
        Authenticate::getInstance()->logout();
    }

    /**
     * @permission anonymous
     *
     * @param string $pin
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return string
     */
    public function PinLogin($pin): string {
        try {
            Authenticate::getInstance()->login(new PinCredentials($pin));
        } catch (\Exception $ex) {
            throw new HttpException(StringLiterals::AUTH_ACCESS_DENIED, HttpStatusCodes::Client_Error_Forbidden);
        }

        return StringLiterals::AUTH_ACCESS_GRANTED;
    }

    /**
     * @permission anonymous
     *
     * @param string $key
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return string
     */
    public function RfidLogin($key): string {
        try {
            Authenticate::getInstance()->login(new PinCredentials($key));
        } catch (\Exception $ex) {
            throw new HttpException(StringLiterals::AUTH_ACCESS_DENIED, HttpStatusCodes::Client_Error_Forbidden);
        }

        return StringLiterals::AUTH_ACCESS_GRANTED;
    }

    /**
     * Summary of AddUserIDToFilters.
     *
     * @param mixed                          $userid
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \vhs\domain\Filter
     */
    private function addUserIDToFilters($userid, $filters): Filter {
        $userService2 = new UserServiceHandler2();
        $user = $userService2->GetUser($userid);

        Domain::coerceFilters($filters);

        if (is_null($user)) {
            throw new UnauthorizedException('User not found or you do not have access');
        }

        $userFilter = Filter::Equal('userid', $user->id);

        if (is_null($filters) || $filters == '') {
            $filters = $userFilter;
        } else {
            $filters = Filter::_And($userFilter, $filters);
        }

        return $filters;
    }

    /**
     * Summary of trimUser.
     *
     * @param \app\domain\User|null $user
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\dto\TrimmedUser
     */
    private function trimUser($user): TrimmedUser {
        if (is_null($user)) {
            throw new HttpException('Client not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        return new TrimmedUser($user);
    }
}
