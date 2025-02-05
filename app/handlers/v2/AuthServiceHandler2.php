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
use app\dto\SavedRefreshToken;
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
use vhs\domain\Filter;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\security\UserPassCredentials;
use vhs\services\Service;

/** @typescript */
class AuthServiceHandler2 extends Service implements IAuthService2 {
    /**
     * Check to see if the user pin and account is valid.
     *
     * @permission administrator|pin-auth
     *
     * @param string $pin
     *
     * @throws string
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

        // Fetch user
        $user = User::find($key->userid);

        // Check if account is active and in good standing, and return result set
        if ($user->valid) {
            $retval->valid = true;
            $retval->userId = $user->id;
            $retval->username = $user->username;
            $retval->type = $user->membership->code;
            $retval->privileges = $key->getAbsolutePrivileges();

            $logAccess(true, $user->id);

            return $retval;
        } else {
            $retval->username = $user->username;
            $retval->message = $user->getInvalidReason();
        }

        // Log and return
        $logAccess(false, $user->id);

        return $retval;
    }

    /**
     * @permission administrator|rfid-auth
     *
     * @param string $rfid
     *
     * @throws string
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

        // Fetch user info
        $user = User::find($key->userid);

        // Check if account is active and in good standing, and return result set
        if ($user->valid) {
            $retval->valid = true;
            $retval->userId = $user->id;
            $retval->username = $user->username;
            $retval->type = $user->membership->code;
            $retval->privileges = $key->getAbsolutePrivileges();

            $logAccess(true, $user->id);

            return $retval;
        } else {
            $retval->username = $user->username;
            $retval->message = $user->getInvalidReason();
        }

        $logAccess(false, $user->id);

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
     * @throws string
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

        // Check if account is active and in good standing, and return result set
        if ($user->valid) {
            $retval->valid = true;
            $retval->userId = $user->id;
            $retval->username = $user->username;
            $retval->type = $user->membership->code;
            $retval->privileges = $key->getAbsolutePrivileges();

            $logAccess(true, $user->id);

            return $retval;
        } else {
            $retval->username = $user->username;
            $retval->message = $user->getInvalidReason();
        }

        // Log and return
        $logAccess(false, $user->id);

        return $retval;
    }

    /**
     * @permission anonymous
     *
     * @param string $username
     *
     * @throws string
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
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountAccessLog($filters): int {
        if (is_string($filters)) {
            //todo total hack.. this is to support GET params for downloading payments
            $filters = json_decode($filters);
        }

        return AccessLog::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountClients($filters): int {
        return AppClient::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $filters
     *
     * @throws string
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
     * @param int    $userid
     * @param string $filters
     *
     * @throws string
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
     * @throws string
     *
     * @return \app\security\UserPrincipal
     */
    public function CurrentUser(): UserPrincipal {
        return CurrentUser::getPrincipal();
    }

    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @throws string
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
     * @throws string
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
     * @throws string
     *
     * @return \app\domain\AccessToken
     */
    public function GetAccessToken($bearerToken): AccessToken {
        return AccessToken::findByToken($bearerToken);
    }

    /**
     * @permission anonymous
     *
     * @param string $clientId
     * @param string $clientSecret
     *
     * @throws string
     *
     * @return \app\domain\AppClient|null
     */
    public function GetClient($clientId, $clientSecret): AppClient|null {
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
     * @param string $clientId
     *
     * @throws string
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
     * @throws string
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
     * @throws string
     *
     * @return \app\dto\TrimmedUser|null
     */
    public function GetUser($username, $password): TrimmedUser|null {
        return $this->trimUser(Authenticate::authenticateOnly($username, $password));
    }

    /**
     * @permission administrator
     *
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @throws string
     *
     * @return \app\domain\AccessLog[]
     */
    public function ListAccessLog($page, $size, $columns, $order, $filters): array {
        if (is_string($filters)) {
            //todo total hack.. this is to support GET params for downloading payments
            $filters = json_decode($filters);
        }

        return AccessLog::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @throws string
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
     * @throws string
     * @throws \Exception
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
     * @param int    $userid
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @throws string
     * @throws \Exception
     *
     * @return \app\domain\AppClient[]
     */
    public function ListUserClients($userid, $page, $size, $columns, $order, $filters): array {
        $userService2 = new UserServiceHandler2();
        $user = $userService2->GetUser($userid);

        if (is_string($filters)) {
            //todo total hack.. this is to support GET params for downloading payments
            $filters = json_decode($filters);
        }

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
     * @throws string
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
     * @throws string
     */
    public function Logout(): void {
        Authenticate::getInstance()->logout();
    }

    /**
     * @permission anonymous
     *
     * @param string $pin
     *
     * @throws string
     *
     * @return string
     */
    public function PinLogin($pin): string {
        try {
            Authenticate::getInstance()->login(new PinCredentials($pin));
        } catch (\Exception $ex) {
            return StringLiterals::AUTH_ACCESS_DENIED;
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
     * @throws string
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
     * @throws string
     *
     * @return bool
     */
    public function RevokeRefreshToken($refreshToken): bool {
        $token = RefreshToken::findByToken($refreshToken);

        if (is_null($token)) {
            throw new \DomainException('RefreshToken token not found', 404);
        }

        return $token->delete();
    }

    /**
     * @permission anonymous
     *
     * @param string $key
     *
     * @throws string
     *
     * @return string
     */
    public function RfidLogin($key): string {
        try {
            Authenticate::getInstance()->login(new PinCredentials($key));
        } catch (\Exception $ex) {
            return StringLiterals::AUTH_ACCESS_DENIED;
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
     * @throws string
     *
     * @return \app\domain\User|false
     */
    public function SaveAccessToken($userId, $accessToken, $clientId, $expires): User|false {
        $user = User::find($userId);
        $client = AppClient::find($clientId);

        if (is_null($user)) {
            return false;
        }

        $token = new AccessToken();

        $token->token = $accessToken;
        $token->user = $user;

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
     * @throws string
     *
     * @return \app\dto\RefreshToken|false|null
     */
    public function SaveRefreshToken($userId, $refreshToken, $clientId, $expires): array|bool|null {
        $user = User::find($userId);
        $client = AppClient::find($clientId);

        if (is_null($user)) {
            return false;
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
     * @param mixed $userid
     * @param mixed $filters
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     * @throws string
     *
     * @return \vhs\domain\Filter
     */
    private function addUserIDToFilters($userid, $filters): Filter {
        $userService2 = new UserServiceHandler2();
        $user = $userService2->GetUser($userid);

        if (is_string($filters)) {
            //todo total hack.. this is to support GET params for downloading payments
            $filters = json_decode($filters);
        }

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
     * @throws string
     *
     * @return \app\domain\AppClient|null
     */
    private function getMyClient($id): AppClient|null {
        $client = AppClient::find($id);

        if (is_null($client)) {
            return null;
        }

        if (CurrentUser::getIdentity() == $client->userid || CurrentUser::hasAnyPermissions('administrator')) {
            return $client;
        }

        return null;
    }

    /**
     * Summary of trimClient.
     *
     * @param mixed $client
     *
     * @throws string
     *
     * @return \app\dto\TrimmedAppClient|null
     */
    private function trimClient($client): TrimmedAppClient|null {
        if (is_null($client)) {
            return null;
        }

        return new TrimmedAppClient([
            'id' => $client->id,
            'expires' => $client->expires,
            'owner' => $this->trimUser($client->owner),
            'name' => $client->name,
            'description' => $client->description,
            'url' => $client->url,
            'redirecturi' => $client->redirecturi,
            'enabled' => $client->enabled
        ]);
    }

    /**
     * Summary of trimClientInfo.
     *
     * @param AppClient|null $client
     *
     * @throws string
     *
     * @return \app\dto\TrimmedAppClient|null
     */
    private function trimClientInfo($client): TrimmedAppClient|null {
        if (is_null($client)) {
            return null;
        }

        return new TrimmedAppClient($client->name, $client->description, $client->url, $client->redirecturi);
    }

    /**
     * Summary of trimUser.
     *
     * @param User $user
     *
     * @throws string
     *
     * @return \app\dto\TrimmedUser|null
     */
    private function trimUser($user): TrimmedUser|null {
        if (is_null($user)) {
            return null;
        }

        return new TrimmedUser([
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'fname' => $user->fname,
            'lname' => $user->lname,
            'membership' => $user->membership,
            'expires' => $user->mem_expire,
            'created' => $user->created,
            'active' => $user->active,
            'privileges' => $user->privileges
        ]);
    }
}
