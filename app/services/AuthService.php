<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:30 PM.
 */

namespace app\services;

use app\constants\StringLiterals;
use app\contracts\IAuthService1;
use app\domain\AccessLog;
use app\domain\AccessToken;
use app\domain\AppClient;
use app\domain\Key;
use app\domain\RefreshToken;
use app\domain\User;
use app\schema\UserSchema;
use app\security\Authenticate;
use app\security\credentials\PinCredentials;
use DateTime;
use vhs\database\Database;
use vhs\database\queries\QuerySelect;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\Filter;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\security\UserPassCredentials;
use vhs\services\Service;

/** @typescript */
class AuthService extends Service implements IAuthService1 {
    /**
     * fill retVal from User result.
     *
     * @param \app\domain\Key     &$key
     * @param \app\domain\User    &$user
     * @param array<string,mixed> &$retval
     *
     * @return bool
     */
    private static function parseValidAccount(&$key, &$user, &$retval): bool {
        if ($user->valid) {
            $retval['valid'] = true;
            $retval['userId'] = $user->id;
            $retval['username'] = $user->username;
            $retval['type'] = $user->membership->code;
            $retval['privileges'] = $key->getAbsolutePrivileges();

            return true;
        } else {
            $retval['username'] = $user->username;
            $retval['message'] = $user->getInvalidReason();
        }

        return false;
    }

    /**
     * Check to see if the user pin and account is valid.
     *
     * @permission administrator|pin-auth
     *
     * @param $pin
     *
     * @return mixed
     */
    public function CheckPin($pin) {
        // pin magic
        // TODO: documentation
        $pin = str_replace('|', '', $pin);

        $intpin = intval($pin);

        $pinid = intval($intpin / 10000);

        $pin = $intpin - $pinid * 10000;

        $pinid = sprintf('%04s', $pinid);
        $pin = sprintf('%04s', $pin);

        // Set defaults
        $retval = [];
        $retval['valid'] = false;
        $retval['type'] = null;
        $retval['privileges'] = null;

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
     * @param $rfid
     *
     * @return mixed
     */
    public function CheckRfid($rfid) {
        // Set defaults
        $retval = [];
        $retval['valid'] = false;
        $retval['type'] = null;
        $retval['privileges'] = null;

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
     * @param $service
     * @param $id
     *
     * @return mixed
     */
    public function CheckService($service, $id) {
        // Set defaults
        $retval = [];
        $retval['valid'] = false;
        $retval['type'] = null;
        $retval['privileges'] = null;

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
     * @param $username
     *
     * @return bool
     */
    public function CheckUsername($username) {
        return Database::exists(
            new QuerySelect(UserSchema::Table(), UserSchema::Column('username'), Where::Equal(UserSchema::Column('username'), $username))
        );
    }

    /**
     * @permission administrator
     *
     * @param $filters
     *
     * @return mixed
     */
    public function CountAccessLog($filters) {
        return AccessLog::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param $filters
     *
     * @return int
     */
    public function CountClients($filters) {
        return AppClient::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $filters
     *
     * @return mixed
     */
    public function CountUserAccessLog($userid, $filters) {
        $filters = $this->AddUserIDToFilters($userid, $filters);

        return AccessLog::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $filters
     *
     * @return mixed
     */
    public function CountUserClients($userid, $filters) {
        $filters = $this->AddUserIDToFilters($userid, $filters);

        return AppClient::count($filters);
    }

    /**
     * @permission anonymous
     *
     * @return mixed
     */
    public function CurrentUser() {
        //$user = User::find(CurrentUser::getIdentity());
        //return $user->username;
        return CurrentUser::getPrincipal();
    }

    /**
     * @permission administrator|user
     *
     * @param $id
     *
     * @return mixed
     */
    public function DeleteClient($id) {
        $client = $this->GetMyClient($id);

        if (is_null($client)) {
            return;
        }

        $client->delete();
    }

    /**
     * @permission administrator|user
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return void
     */
    public function EnableClient($id, $enabled) {
        $client = $this->GetMyClient($id);

        if (is_null($client)) {
            return;
        }

        $client->enabled = $enabled;

        $client->save();
    }

    /**
     * @permission oauth-provider
     *
     * @param $bearerToken
     *
     * @return mixed
     */
    public function GetAccessToken($bearerToken) {
        return AccessToken::findByToken($bearerToken);
    }

    /**
     * @permission anonymous
     *
     * @param int    $clientId
     * @param string $clientSecret
     *
     * @return mixed|null
     */
    public function GetClient($clientId, $clientSecret) {
        /** @var AppClient|null */
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
     * @return mixed
     */
    public function GetClientInfo($clientId) {
        $client = AppClient::find($clientId);

        if (!is_null($client)) {
            return $this->trimClientInfo($client);
        }

        return null;
    }

    /**
     * @permission oauth-provider
     *
     * @param $refreshToken
     *
     * @return mixed
     */
    public function GetRefreshToken($refreshToken) {
        return RefreshToken::findByToken($refreshToken);
    }

    /**
     * @permission oauth-provider
     *
     * @param $username
     * @param $password
     *
     * @return mixed
     */
    public function GetUser($username, $password) {
        return $this->trimUser(Authenticate::authenticateOnly($username, $password));
    }

    /**
     * @permission administrator
     *
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return \app\domain\AccessLog[]
     */
    public function ListAccessLog($page, $size, $columns, $order, $filters) {
        return AccessLog::page($page, $size, $columns, $order, $filters);
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
     * @return mixed
     */
    public function ListClients($page, $size, $columns, $order, $filters) {
        return AppClient::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return mixed
     */
    public function ListUserAccessLog($userid, $page, $size, $columns, $order, $filters) {
        $filters = $this->AddUserIDToFilters($userid, $filters);

        return AccessLog::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int   $userid
     * @param int   $page
     * @param int   $size
     * @param mixed $columns
     * @param mixed $order
     * @param mixed $filters
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return AppClient[]
     */
    public function ListUserClients($userid, $page, $size, $columns, $order, $filters) {
        $userService = new UserService();
        $user = $userService->GetUser($userid);

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

        $cols = explode(',', $columns);

        array_push($cols, 'userid');

        $columns = implode(',', array_unique($cols));

        return AppClient::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission anonymous
     *
     * @param $username
     * @param $password
     *
     * @return mixed
     */
    public function Login($username, $password) {
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
     * @return mixed
     */
    public function Logout() {
        Authenticate::getInstance()->logout();
    }

    /**
     * @permission anonymous
     *
     * @param string $pin
     *
     * @return string
     */
    public function PinLogin($pin) {
        try {
            Authenticate::getInstance()->login(new PinCredentials($pin));
        } catch (\Exception $ex) {
            return StringLiterals::AUTH_ACCESS_DENIED;
        }

        return StringLiterals::AUTH_ACCESS_GRANTED;
    }

    /**
     * @permission user
     *
     * @param $name
     * @param $description
     * @param $url
     * @param $redirecturi
     *
     * @return mixed
     */
    public function RegisterClient($name, $description, $url, $redirecturi) {
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
     * @param $refreshToken
     *
     * @return mixed
     */
    public function RevokeRefreshToken($refreshToken) {
        $token = RefreshToken::findByToken($refreshToken);

        if (!is_null($token)) {
            $token->delete();
        }
    }

    /**
     * @permission anonymous
     *
     * @param string $key
     *
     * @return string
     */
    public function RfidLogin($key) {
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
     * @param $userId
     * @param $accessToken
     * @param $clientId
     * @param $expires
     *
     * @return mixed
     */
    public function SaveAccessToken($userId, $accessToken, $clientId, $expires) {
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
     * @param $userId
     * @param $refreshToken
     * @param $clientId
     * @param $expires
     *
     * @return mixed
     */
    public function SaveRefreshToken($userId, $refreshToken, $clientId, $expires) {
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
     * AddUserIDToFilters.
     *
     * @param int           $userid
     * @param Filter|string $filters
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return Filter
     */
    private function AddUserIDToFilters($userid, $filters) {
        $userService = new UserService();
        $user = $userService->GetUser($userid);

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
     * GetMyClient.
     *
     * @param int $id
     *
     * @return AppClient|null
     */
    private function GetMyClient($id) {
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
     * trimClient.
     *
     * @param AppClient $client
     *
     * @return array<string,mixed>|null
     */
    private function trimClient($client) {
        if (is_null($client)) {
            return null;
        }

        return [
            'id' => $client->id,
            'expires' => $client->expires,
            'owner' => $this->trimUser($client->owner),
            'name' => $client->name,
            'description' => $client->description,
            'url' => $client->url,
            'redirecturi' => $client->redirecturi,
            'enabled' => $client->enabled
        ];
    }

    /**
     * trimClientInfo.
     *
     * @param AppClient|null $client
     *
     * @return array<string,mixed>|null
     */
    private function trimClientInfo($client) {
        if (is_null($client)) {
            return null;
        }

        return [
            'name' => $client->name,
            'description' => $client->description,
            'url' => $client->url,
            'redirecturi' => $client->redirecturi
        ];
    }

    /**
     * trimUser.
     *
     * @param User|null $user
     *
     * @return array<string,mixed>|null
     */
    private function trimUser($user) {
        if (is_null($user)) {
            return null;
        }

        return [
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
        ];
    }
}
