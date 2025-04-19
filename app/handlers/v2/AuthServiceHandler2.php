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
use app\domain\AccessToken;
use app\domain\AppClient;
use app\domain\Key;
use app\domain\RefreshToken;
use app\domain\User;
use app\dto\TrimmedAppClient;
use app\dto\TrimmedUser;
use app\schema\UserSchema;
use app\security\Authenticate;
use app\security\credentials\PinCredentials;
use app\security\UserPrincipal;
use app\utils\AuthCheckResult;
use DateTime;
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
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountClients($filters): int {
        return AppClient::count($filters);
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
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountUserClients($userid, $filters): int {
        $filters = $this->addUserIDToFilters($userid, $filters);

        return AppClient::count($filters);
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
     * @permission administrator|user
     *
     * @param int $id
     *
     * @return void
     */
    public function DeleteClient($id): void {
        $client = $this->getMyClient($id);

        $client->delete();
    }

    /**
     * @permission administrator|user
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return bool
     */
    public function EnableClient($id, $enabled): bool {
        $client = $this->getMyClient($id);

        $client->enabled = $enabled;

        return $client->save();
    }

    /**
     * @permission oauth-provider
     *
     * @param string $bearerToken
     *
     * @return \app\domain\AccessToken
     */
    public function GetAccessToken($bearerToken): AccessToken {
        return AccessToken::findByToken($bearerToken);
    }

    /**
     * @permission anonymous
     *
     * @param int    $clientId
     * @param string $clientSecret
     *
     * @return \app\dto\TrimmedAppClient|null
     */
    public function GetClient($clientId, $clientSecret): TrimmedAppClient|null {
        $client = AppClient::find($clientId);

        if (!is_null($client) && $client->secret == $clientSecret) {
            return $this->trimClient($client);
        }

        return null;
    }

    /**
     * @permission oauth-provider
     * @permission authenticated
     *
     * @param int $clientId
     *
     * @return \app\dto\TrimmedAppClient|null
     */
    public function GetClientInfo($clientId): TrimmedAppClient|null {
        $client = AppClient::find($clientId);

        if (!is_null($client)) {
            return $this->trimClientInfo($client);
        }

        return null;
    }

    /**
     * @permission oauth-provider
     *
     * @param string $refreshToken
     *
     * @return \app\domain\RefreshToken
     */
    public function GetRefreshToken($refreshToken): RefreshToken {
        return RefreshToken::findByToken($refreshToken);
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
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\AppClient[]
     */
    public function ListClients($page, $size, $columns, $order, $filters): array {
        return AppClient::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int                $userid
     * @param int                $page
     * @param int                $size
     * @param string             $columns
     * @param string             $order
     * @param \vhs\domain\Filter $filters
     *
     * @return \app\domain\AccessLog[]
     */
    public function ListUserAccessLog($userid, $page, $size, $columns, $order, $filters): array {
        $filters = $this->addUserIDToFilters($userid, $filters);

        return AccessLog::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int                            $userid
     * @param int                            $page
     * @param int                            $size
     * @param string                         $columns
     * @param string                         $order
     * @param string|\vhs\domain\Filter|null $filters
     *

     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \app\domain\AppClient[]
     */
    public function ListUserClients($userid, $page, $size, $columns, $order, $filters): array {
        $userService2 = new UserServiceHandler2();
        $user = $userService2->GetUser($userid);

        AppClient::coerceFilters($filters);

        if (is_null($user)) {
            throw new UnauthorizedException('User not found or you do not have access');
        }

        $userFilter = Filter::Equal('userid', $user->id);

        if (is_null($filters) || $filters == '') {
            $filters = $userFilter;
        } else {
            $filters = Filter::_And($userFilter, $filters);
        }

        $cols = explode(',', $columns);

        array_push($cols, 'userid');

        $columns = implode(',', array_unique($cols));

        return AppClient::page($page, $size, $columns, $order, $filters);
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
     * @permission administrator|user
     *
     * @param string $name
     * @param string $description
     * @param string $url
     * @param string $redirecturi
     *
     * @return \app\domain\AppClient
     */
    public function RegisterClient($name, $description, $url, $redirecturi): AppClient {
        $client = new AppClient();

        $client->name = $name;
        $client->description = $description;
        $client->url = $url;
        $client->redirecturi = $redirecturi;
        $client->secret = bin2hex(openssl_random_pseudo_bytes(32));
        $client->owner = User::find(CurrentUser::getIdentity());
        $client->expires = '2020-01-01';

        $client->save();

        return $client;
    }

    /**
     * @permission oauth-provider
     *
     * @param string $refreshToken
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return void
     */
    public function RevokeRefreshToken($refreshToken): void {
        $token = RefreshToken::findByToken($refreshToken);

        if (is_null($token)) {
            throw new HttpException('RefreshToken token not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        $token->delete();
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
     * @permission oauth-provider
     *
     * @param int    $userId
     * @param string $accessToken
     * @param int    $clientId
     * @param string $expires
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\domain\User|false
     */
    public function SaveAccessToken($userId, $accessToken, $clientId, $expires): User|false {
        $user = User::find($userId);

        if (is_null($user)) {
            throw new HttpException('User not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        $token = new AccessToken();

        $token->token = $accessToken;
        $token->user = $user;

        $client = AppClient::find($clientId);

        if (!is_null($client)) {
            $token->client = $client;
        }

        $expiry = new DateTime($expires);

        $token->expires = $expiry->format('Y-m-d H:i:s');

        $token->save();

        return $user;
    }

    /**
     * @permission oauth-provider
     *
     * @param int    $userId
     * @param string $refreshToken
     * @param int    $clientId
     * @param string $expires
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\dto\TrimmedUser
     */
    public function SaveRefreshToken($userId, $refreshToken, $clientId, $expires): TrimmedUser {
        $user = User::find($userId);
        $client = AppClient::find($clientId);

        if (is_null($user)) {
            throw new HttpException('User not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        $token = new RefreshToken();

        $token->token = $refreshToken;
        $token->user = $user;

        if (!is_null($client)) {
            $token->client = $client;
        }

        $expiry = new DateTime($expires);

        $token->expires = $expiry->format('Y-m-d H:i:s');

        $token->save();

        return $this->trimUser($user);
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
     * Summary of getMyClient.
     *
     * @param int $id
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\domain\AppClient
     */
    private function getMyClient($id): AppClient {
        $client = AppClient::find($id);

        if (is_null($client)) {
            throw new HttpException('Client not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        if (CurrentUser::getIdentity() == $client->userid || CurrentUser::hasAnyPermissions('administrator')) {
            return $client;
        }

        throw new HttpException('Client is not accessible', HttpStatusCodes::Client_Error_Forbidden);
    }

    /**
     * Summary of trimClient.
     *
     * @param \app\domain\AppClient $client
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\dto\TrimmedAppClient
     */
    private function trimClient($client): TrimmedAppClient {
        if (is_null($client)) {
            throw new HttpException('Client not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        return new TrimmedAppClient($client);
    }

    /**
     * Summary of trimClientInfo.
     *
     * @param \app\domain\AppClient|null $client
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\dto\TrimmedAppClient
     */
    private function trimClientInfo($client): TrimmedAppClient {
        if (is_null($client)) {
            throw new HttpException('Client not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        return new TrimmedAppClient($client);
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
