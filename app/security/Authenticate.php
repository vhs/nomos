<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 6:21 PM
 */

namespace app\security;


use app\domain\AccessLog;
use app\domain\AccessToken;
use app\domain\Key;
use app\domain\User;
use app\security\credentials\ApiCredentials;
use app\security\credentials\TokenCredentials;
use DateTime;
use vhs\database\Database;
use vhs\security\AnonPrincipal;
use vhs\security\BearerTokenCredentials;
use vhs\security\CurrentUser;
use vhs\security\exceptions\InvalidCredentials;
use vhs\security\IAuthenticate;
use vhs\security\ICredentials;
use vhs\security\IPrincipal;
use vhs\security\UserPassCredentials;
use vhs\Singleton;

class Authenticate extends Singleton implements IAuthenticate {

    public static function login(ICredentials $credentials) {
        switch(get_class($credentials)) {
            case "vhs\\security\\UserPassCredentials":
                /** @var UserPassCredentials $credentials */
                self::userLogin($credentials->getUsername(), $credentials->getPassword());
                break;
            case "app\\security\\credentials\\ApiCredentials":
                /** @var ApiCredentials $credentials */
                self::keyLogin(Key::findByApiKey($credentials->getToken()), $credentials);
                break;
            case "vhs\\security\\BearerTokenCredentials":
                /** @var BearerTokenCredentials $credentials */
                self::bearerLogin($credentials);
                break;
            default:
                throw new InvalidCredentials("Unsupported authentication type.");
        }
    }

    public static function authenticateOnly($username, $password) {
        return self::userLogin($username, $password, true);
    }

    private static function userLogin($username, $password, $authonly = false) {
        $ipaddr = self::getRemoteIP();

        try {
            $user = self::findUser($username);
        } catch(\Exception $ex) {
            AccessLog::log($username, "userpass", false, $ipaddr);
            throw $ex;
        }

        if(self::isUserValid($user) && PasswordUtil::check($password, $user->password)) {
            if (!$authonly) {
                CurrentUser::setPrincipal(self::buildPrincipal($user));
            }

            self::recordLogin($user, $ipaddr);

            AccessLog::log($username, "userpass", true, $ipaddr, $user->id);

            return $user;
        } else {
            AccessLog::log($username, "userpass", false, $ipaddr, $user->id);
            throw new InvalidCredentials("Incorrect username or password");
        }
    }

    private static function isUserValid($user) {
        switch($user->active) {
            case "n": //not active
                throw new InvalidCredentials("Your account is not activated");
                break;
            case "y": //yes they are active
                return true;
                break;
            case "t": //pending email verification
                throw new InvalidCredentials("You need to verify your email address");
                break;
            case "b": //banned
                throw new InvalidCredentials("Your account has been banned");
                break;
        }

        return false;
    }

    private static function keyLogin($keys, TokenCredentials $credentials) {
        $ipaddr = self::getRemoteIP();

        if(count($keys) <> 1) {
            AccessLog::log($credentials->getToken(), $credentials->getType(), false, $ipaddr);
            throw new InvalidCredentials("Invalid key");
        }

        $key = $keys[0];
        $identity = null;
        $name = "token:" . $key->id . ":";

        $privileges = array_map(
            function($priviledge) { return $priviledge->code; },
            $key->privileges->all()
        );

        if(!is_null($key->userid) && $key->userid != "0") {
            try {
                $user = User::find($key->userid);
            } catch (\Exception $ex) {
                AccessLog::log($credentials->getToken(), $credentials->getType(), false, $ipaddr, $key->userid);
                throw new InvalidCredentials("Invalid key");
            }

            if (!is_null($user) && self::isUserValid($user)) {
                $identity = $user->id;
                $name .= $user->username;

                if(in_array("inherit", $privileges)) {
                    array_push($privileges, "user");
                    array_merge(
                        $privileges,
                        array_map(
                            function ($privilege) { return $privilege->code; },
                            $user->membership->privileges->all()
                        ),
                        array_map(
                            function ($privilege) { return $privilege->code; },
                            $user->privileges->all()
                        )
                    );
                }
            } else {
                AccessLog::log($credentials->getToken(), $credentials->getType(), false, $ipaddr);
                throw new InvalidCredentials("Invalid key");
            }
        }

        $grants = array();
        foreach($privileges as $priv) {
            if (strpos($priv, "grant:") === 0)
                array_push($grants, substr($priv, 6));
        }

        if (count($grants) > 0)
            array_push($privileges, "grants");

        CurrentUser::setPrincipal(
            new TokenPrincipal(
                $identity,
                $privileges,
                $grants,
                $name
            )
        );

        AccessLog::log($credentials->getToken(), $credentials->getType(), true, $ipaddr, $key->userid);
    }

    private static function bearerLogin(BearerTokenCredentials $credentials) {
        $ipaddr = self::getRemoteIP();

        $token = null;

        try {
            $token = AccessToken::findByToken($credentials->getToken());
        } catch(\Exception $ex) {}

        if (is_null($token) || is_null($token->user)) {
            AccessLog::log($credentials->getToken(), "bearer", false, $ipaddr);
            throw new InvalidCredentials("Invalid access token");
        }

        if(self::isUserValid($token->user) && (is_null($token->client) || ($token->client->enabled && (is_null($token->client->expires) || new DateTime($token->client->expires) > new DateTime())))) {
            CurrentUser::setPrincipal(self::buildPrincipal($token->user));

            self::recordLogin($token->user, $ipaddr);

            AccessLog::log($credentials->getToken(), "bearer", true, $ipaddr, $token->user->id);
        } else {
            AccessLog::log($credentials->getToken(), "bearer", false, $ipaddr, $token->user->id);
            throw new InvalidCredentials("Invalid access token");
        }
    }

    public static function logout() {
        CurrentUser::setPrincipal(new AnonPrincipal());
    }

    /**
     * @return bool
     */
    public static function isAuthenticated() {
        return !CurrentUser::isAnon();
    }

    /**
     * @return IPrincipal
     */
    public static function currentPrincipal() {
        return CurrentUser::getPrincipal();
    }

    /**
     * @param $user
     * @return UserPrincipal
     */
    private static function buildPrincipal($user)
    {
        $membershipPrivs = array();

        if (!is_null($user->membership)) {
            $membershipPrivs = array_map(
                function ($privilege) {
                    return $privilege->code;
                },
                $user->membership->privileges->all()
            );
        }

        $privileges = array_merge(
            $membershipPrivs, array_map(
                function ($privilege) {
                    return $privilege->code;
                },
                $user->privileges->all()
            )
        );

        $grants = array();
        foreach ($privileges as $priv) {
            if (strpos($priv, "grant:") === 0)
                array_push($grants, substr($priv, 6));
        }

        if (count($grants) > 0)
            array_push($privileges, "grants");

        array_push($privileges, "user");

        return new UserPrincipal($user->id, $privileges, $grants, $user->username);
    }

    /**
     * @param $user
     * @param $ipaddr
     * @throws \Exception
     */
    private static function recordLogin($user, $ipaddr)
    {
        $user->lastlogin = date(Database::DateFormat());
        $user->lastip = $ipaddr;

        try {
            $user->save();
        } catch (\Exception $ex) {
            self::logout();

            throw $ex;
        }
    }

    private static function getRemoteIP()
    {
        $ipaddr = null;
        if (isset($_SERVER) && array_key_exists("REMOTE_ADDR", $_SERVER))
            $ipaddr = $_SERVER['REMOTE_ADDR'];

        return $ipaddr;
    }

    /**
     * @param $username
     * @return User
     * @throws InvalidCredentials
     */
    private static function findUser($username)
    {
        $users = User::findByUsername($username);

        if (count($users) <> 1) {
            //Try e-mail Address
            $users = User::findByEmail($username);
        }

        if (count($users) <> 1) {
            throw new InvalidCredentials("Incorrect username or password");
        }

        $user = $users[0];
        return $user;
    }
}
