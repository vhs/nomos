<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:30 PM
 */

namespace app\services;

use DateTime;
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
     * Check to see if the user pin and account is valid.
     * @permission authenticated
     * @param $pin
     * @return mixed
     */
    public function CheckPin($pin) {
        // pin magic
        // TODO: documentation 
        $pin = str_replace("|", "", $pin);

        $intpin = intval($pin);

        $pinid = intval($intpin/10000);

        $pin = $intpin - ($pinid * 10000);

        $pinid = sprintf("%04s", $pinid);
        $pin = sprintf("%04s", $pin);

        // Set defaults
        $retval = array();
        $retval["valid"] = false;
        $retval["type"] = null;
        $retval["privileges"] = null;

        // Find key by pin
        $keys = Key::findByPin($pinid ."|" . $pin);

        $logAccess = function($granted, $userid = null) use ($pinid, $pin) {
            try {
                AccessLog::log($pinid ."|" . $pin, 'pin', $granted, $_SERVER['REMOTE_ADDR'], $userid);
            } catch(\Exception $ex) {/*mmm*/}
        };

        // If we get an invalid result, log and fail (we should always only get one result)
        if(count($keys) <> 1) {
            $logAccess(false);
            return $retval;
        }

        // Get key
        $key = $keys[0];

        // If missing userid, log and fail
        if($key->userid == null) {
            $logAccess(false);
            return $retval;
        }

        // Fetch user
        $user = User::find($key->userid);

        // Check if account is active and in good standing, and return result set
        if($user->valid) {
            $retval["valid"] = true;
            $retval["userId"] = $user->id;
            $retval["username"] = $user->username;
            $retval["type"] = $user->membership->code;
            $retval["privileges"] = $key->getAbsolutePrivileges();
             
            $logAccess(true, $user->id);

            return $retval;
        } else {
            $retval["username"] = $user->username;
            $retval["message"] = $user->getInvalidReason(); 
        }

        // Log and return
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
        // Set defaults
        $retval = array();
        $retval["valid"] = false;
        $retval["type"] = null;
        $retval["privileges"] = null;

        // Always parse service names as lowercase
        $service = strtolower($service);

        // Find service key
        $keys = Key::findByService($service, $id);

        $logAccess = function($granted, $userid = null) use ($service, $id) {
            try {
                AccessLog::log($id, $service, $granted, $_SERVER['REMOTE_ADDR'], $userid);
            } catch(\Exception $ex) {/*mmm*/}
        };

        // If we get an invalid result, log and fail (we should always only get one result)
        if(count($keys) <> 1) {
            $logAccess(false);
            return $retval;
        }

        // Fetch key
        $key = $keys[0];

        // Check if there's a userid attached to the key, else fail
        if($key->userid == null) {
            $logAccess(false);
            return $retval;
        }

        // Fetch userinfo
        $user = User::find($key->userid);

        // Check if account is active and in good standing, and return result set
        if($user->valid) {
            $retval["valid"] = true;
            $retval["userId"] = $user->id;
            $retval["username"] = $user->username;
            $retval["type"] = $user->membership->code;
            $retval["privileges"] = $key->getAbsolutePrivileges();

            $logAccess(true, $user->id);

            return $retval;
        } else {
            $retval["username"] = $user->username;
            $retval["message"] = $user->getInvalidReason();
        }

        // Log and return
        $logAccess(false, $user->id);

        return $retval;
    }

    /**
     * @permission authenticated
     * @param $rfid
     * @return mixed
     */
    public function CheckRfid($rfid) {
        // Set defaults
        $retval = array();
        $retval["valid"] = false;
        $retval["type"] = null;
        $retval["privileges"] = null;
        
        // Find key by RFID card id
        $keys = Key::findByRfid($rfid);

        $logAccess = function($granted, $userid = null) use ($rfid) {
            try {
                AccessLog::log("rfid", $rfid, $granted, $_SERVER['REMOTE_ADDR'], $userid);
            } catch(\Exception $ex) {/*mmm*/}
        };
        
        // If we get an invalid result, log and fail (we should always only get one result)
        if(count($keys) <> 1) {
            $logAccess(false);
            return $retval;
        }
        
        // Fetch key
        $key = $keys[0];
        
        // Check if there's a userid attached to the key, else fail
        if($key->userid == null) {
            $logAccess(false);
            return $retval;
        }
        
        // Fetch user info
        $user = User::find($key->userid);

        // Check if account is active and in good standing, and return result set
        if($user->valid) {
            $retval["valid"] = true;
            $retval["userId"] = $user->id;
            $retval["username"] = $user->username;
            $retval["type"] = $user->membership->code;
            $retval["privileges"] = $key->getAbsolutePrivileges();
        
            $logAccess(true, $user->id);
        
            return $retval;
        } else {
            $retval["username"] = $user->username;
            $retval["message"] = $user->getInvalidReason();
        }
        
        $logAccess(false, $user->id);
        
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

    private function AddUserIDToFilters($userid, $filters)
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

        return $filters;
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
        $filters = $this->AddUserIDToFilters($userid, $filters);
        
        return AccessLog::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     * @param $filters
     * @return int
     */
    public function CountUserAccessLog($userid, $filters)
    {
        $filters = $this->AddUserIDToFilters($userid, $filters);
        return AccessLog::count($filters);
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
     * @permission administrator
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function CountAccessLog($filters)
    {
        if (is_string($filters)) //todo total hack.. this is to support GET params for downloading payments
            $filters = json_decode($filters);

        return AccessLog::count($filters);
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

    private function trimUser($user) {
        if (is_null($user)) return null;

        return [
            "id" => $user->id,
            "username" => $user->username,
            "email" => $user->email,
            "fname" => $user->fname,
            "lname" => $user->lname,
            "membership" => $user->membership,
            "expires" => $user->mem_expire,
            "created" => $user->created,
            "active" => $user->active,
            "privileges" => $user->privileges
        ];
    }

    private function trimClient($client) {
        if (is_null($client)) return null;

        return [
            "id" => $client->id,
            "expires" => $client->expires,
            "owner" => $this->trimUser($client->owner),
            "name" => $client->name,
            "description" => $client->description,
            "url" => $client->url,
            "redirecturi" => $client->redirecturi,
            "enabled" => $client->enabled
        ];
    }

    /**
     * @permission oauth-provider
     * @param $username
     * @param $password
     * @return mixed
     */
    public function GetUser($username, $password)
    {
        return $this->trimUser(Authenticate::authenticateOnly($username, $password));
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
            return $this->trimClient($client);

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
    public function RegisterClient($name, $description, $url, $redirecturi)
    {
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

    /**
     * @permission administrator
     * @param $filters
     * @return int
     */
    public function CountClients($filters)
    {
        return AppClient::count($filters);
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

        return $this->trimUser($user);
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
