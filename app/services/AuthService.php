<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:30 PM
 */

namespace app\services;


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
use vhs\database\Database;
use vhs\database\wheres\Where;
use vhs\domain\Filter;
use vhs\security\CurrentUser;
use vhs\security\UserPassCredentials;
use vhs\services\Service;

class AuthService extends Service implements IAuthService1 {

    /**
     * @permission anonymous
     * @param $username
     * @param $password
     * @return mixed
     */
    public function Login($username, $password) {
        try {
            Authenticate::getInstance()->login(new UserPassCredentials($username, $password));
        } catch(\Exception $ex) {
            return $ex->getMessage();
        }

        return "Access Granted";
    }

    /**
     * @permission anonymous
     * @param $pin
     * @return mixed
     */
    public function PinLogin($pin) {
        try {
            Authenticate::getInstance()->login(new PinCredentials($pin));
        } catch(\Exception $ex) {
            return "Access Denied";
        }

        return "Access Granted";
    }

    /**
     * @permission anonymous
     * @param $key
     * @return mixed
     */
    public function RfidLogin($key) {
        try {
            Authenticate::getInstance()->login(new PinCredentials($key));
        } catch(\Exception $ex) {
            return "Access Denied";
        }

        return "Access Granted";
    }

    /**
     * @permission anonymous
     * @return mixed
     */
    public function CurrentUser() {
        //$user = User::find(CurrentUser::getIdentity());
        //return $user->username;
        return CurrentUser::getPrincipal();
    }

    /**
     * @permission anonymous
     * @return mixed
     */
    public function Logout() {
        Authenticate::getInstance()->logout();
    }

    /**
     * @permission authenticated
     * @param $pin
     * @return mixed
     */
    public function CheckPin($pin) {

        $pin = str_replace("|", "", $pin);

        $intpin = intval($pin);

        $pinid = intval($intpin/10000);

        $pin = $intpin - ($pinid * 10000);

        $pinid = sprintf("%04s", $pinid);
        $pin = sprintf("%04s", $pin);

        $retval = array();
        $retval["valid"] = false;
        $retval["type"] = null;
        $retval["privileges"] = null;

        $keys = Key::findByPin($pinid ."|" . $pin);

        $logAccess = function($granted, $userid = null) use ($pinid, $pin) {
            try {
                AccessLog::log($pinid ."|" . $pin, 'pin', $granted, $_SERVER['REMOTE_ADDR'], $userid);
            } catch(\Exception $ex) {/*mmm*/}
        };

        if(count($keys) <> 1) {
            $logAccess(false);
            return $retval;
        }

        $key = $keys[0];

        if($key->userid == null) {
            $logAccess(false);
            return $retval;
        }

        $user = User::find($key->userid);

        if($user->active == 'y') {
            $retval["valid"] = true;
            $retval["type"] = $user->membership->code;
            $retval["privileges"] = $key->getAbsolutePrivileges();

            $logAccess(true, $user->id);

            return $retval;
        }

        $logAccess(false, $user->id);

        return $retval;
    }

    /**
     * Check to see if the user service/id is valid. A service could be github/slack/google
     * @permission authenticated
     * @param $service
     * @param $id
     * @return mixed
     */
    public function CheckService($service, $id) {

        $retval = array();
        $retval["valid"] = false;
        $retval["type"] = null;
        $retval["privileges"] = null;

        $service = strtolower($service);

        $keys = Key::findByService($service, $id);

        $logAccess = function($granted, $userid = null) use ($service, $id) {
            try {
                AccessLog::log($id, $service, $granted, $_SERVER['REMOTE_ADDR'], $userid);
            } catch(\Exception $ex) {/*mmm*/}
        };

        if(count($keys) <> 1) {
            $logAccess(false);
            return $retval;
        }

        $key = $keys[0];

        if($key->userid == null) {
            $logAccess(false);
            return $retval;
        }

        $user = User::find($key->userid);

        if($user->active == 'y') {
            $retval["valid"] = true;
            $retval["userId"] = $user->id;
            $retval["username"] = $user->username;
            $retval["type"] = $user->membership->code;
            $retval["privileges"] = $key->getAbsolutePrivileges();

            $logAccess(true, $user->id);

            return $retval;
        }

        $logAccess(false, $user->id);

        return $retval;
    }

    /**
     * @permission authenticated
     * @param $rfid
     * @return mixed
     */
    public function CheckRfid($rfid) {
        $retval = array();
        $retval["valid"] = false;
        $retval["type"] = null;
        $retval["privileges"] = null;

        $keys = Key::findByRfid($rfid);

        if(count($keys) <> 1)
            return $retval;

        $key = $keys[0];

        if($key->userid == null)
            return $retval;

        $user = User::find($key->userid);

        if($user->active == 'y') {
            $retval["privileges"] = $key->getAbsolutePrivileges();
            $retval["valid"] = true;
            $retval["type"] = $user->membership->code;
            return $retval;
        }

        return $retval;
    }

    /**
     * @permission anonymous
     * @param $username
     * @return boolean
     */
    public function CheckUsername($username) {
        return Database::exists(UserSchema::Table(), Where::Equal(UserSchema::Column("username"), $username));
    }

    /**
     * @permission administrator|user
     * @param $userid
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     * @throws \Exception
     */
    public function ListUserAccessLog($userid, $page, $size, $columns, $order, $filters)
    {
        $userService = new UserService();
        $user = $userService->GetUser($userid);

        if (is_string($filters)) //todo total hack.. this is to support GET params for downloading payments
            $filters = json_decode($filters);

        if (is_null($user))
            throw new \Exception("User not found or you do not have access");

        $userFilter = Filter::Equal("userid", $user->id);

        if (is_null($filters) || $filters == "")
            $filters = $userFilter;
        else
            $filters = Filter::_And($userFilter, $filters);

        $cols = explode(",", $columns);

        array_push($cols, "userid");

        $columns = implode(",", array_unique($cols));

        return AccessLog::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListAccessLog($page, $size, $columns, $order, $filters)
    {
        if (is_string($filters)) //todo total hack.. this is to support GET params for downloading payments
            $filters = json_decode($filters);

        return AccessLog::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission oauth-provider
     * @param $bearerToken
     * @return mixed
     */
    public function GetAccessToken($bearerToken)
    {
        return AccessToken::findByToken($bearerToken);
    }

    /**
     * @permission oauth-provider
     * @param $userId
     * @param $accessToken
     * @return mixed
     */
    public function SaveAccessToken($userId, $accessToken, $clientId, $expires)
    {
        $user = User::find($userId);
        $client = AppClient::find($clientId);

        if(is_null($user)) return false;

        $token = new AccessToken();

        $token->token = $accessToken;
        $token->user = $user;

        if (!is_null($client))
            $token->client = $client;

        $expiry = new \DateTime($expires);

        $token->expires = $expiry->format("Y-m-d H:i:s");

        $token->save();

        return $user;
    }

    /**
     * @permission oauth-provider
     * @param $username
     * @param $password
     * @return mixed
     */
    public function GetUser($username, $password)
    {
        return Authenticate::authenticateOnly($username, $password);
    }

    /**
     * @permission oauth-provider
     * @param $clientId
     * @param $clientSecret
     * @return mixed
     */
    public function GetClient($clientId, $clientSecret)
    {
        $client = AppClient::find($clientId);

        if (!is_null($client) && $client->secret == $clientSecret)
            return $client;

        return null;
    }

    /**
     * @permission user
     * @param $name
     * @param $description
     * @param $url
     * @param $redirectUri
     * @return mixed
     */
    public function RegisterClient($name, $description, $url, $redirectUri)
    {
        $client = new AppClient();

        $client->name = $name;
        $client->description = $description;
        $client->url = $url;
        $client->redirectUri = $redirectUri;
        $client->secret = bin2hex(openssl_random_pseudo_bytes(32));
        $client->owner = User::find(CurrentUser::getIdentity());

        $client->save();

        return $client;
    }

    /**
     * @param $userid
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return array
     * @throws \Exception
     */
    public function ListUserClients($userid, $page, $size, $columns, $order, $filters)
    {
        $userService = new UserService();
        $user = $userService->GetUser($userid);

        if (is_string($filters)) //todo total hack.. this is to support GET params for downloading payments
            $filters = json_decode($filters);

        if (is_null($user))
            throw new \Exception("User not found or you do not have access");

        $userFilter = Filter::Equal("userid", $user->id);

        if (is_null($filters) || $filters == "")
            $filters = $userFilter;
        else
            $filters = Filter::_And($userFilter, $filters);

        $cols = explode(",", $columns);

        array_push($cols, "userid");

        $columns = implode(",", array_unique($cols));

        return AppClient::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListClients($page, $size, $columns, $order, $filters)
    {
        return AppClient::page($page, $size, $columns, $order, $filters);
    }

    private function GetMyClient($id) {

        $client = AppClient::find($id);

        if (is_null($client))
            return null;

        if (CurrentUser::getIdentity() == $client->userid || CurrentUser::hasAnyPermissions("administrator"))
            return $client;

        return null;
    }

    /**
     * @permission administrator|user
     * @param $id
     * @param $enabled
     * @return mixed
     */
    public function EnableClient($id, $enabled)
    {
        $client = $this->GetMyClient($id);

        if (is_null($client)) return;

        $client->enabled = $enabled;

        $client->save();
    }

    /**
     * @permission administrator|user
     * @param $id
     * @return mixed
     */
    public function DeleteClient($id)
    {
        $client = $this->GetMyClient($id);

        if (is_null($client)) return;

        $client->delete();
    }

    /**
     * @permission oauth-provider
     * @param $refreshToken
     * @return mixed
     */
    public function GetRefreshToken($refreshToken)
    {
        return RefreshToken::findByToken($refreshToken);
    }

    /**
     * @permission oauth-provider
     * @param $userId
     * @param $refreshToken
     * @param $clientId
     * @param $expires
     * @return mixed
     */
    public function SaveRefreshToken($userId, $refreshToken, $clientId, $expires)
    {
        $user = User::find($userId);
        $client = AppClient::find($clientId);

        if(is_null($user)) return false;

        $token = new RefreshToken();

        $token->token = $refreshToken;
        $token->user = $user;

        if (!is_null($client))
            $token->client = $client;

        $expiry = new \DateTime($expires);

        $token->expires = $expiry->format("Y-m-d H:i:s");

        $token->save();

        return $user;
    }

    /**
     * @permission oauth-provider
     * @param $refreshToken
     * @return mixed
     */
    public function RevokeRefreshToken($refreshToken)
    {
        $token = RefreshToken::findByToken($refreshToken);

        if (!is_null($token)) {
            $token->delete();
        }
    }
}
