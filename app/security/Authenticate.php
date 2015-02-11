<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 6:21 PM
 */

namespace app\security;


use app\domain\AccessLog;
use app\domain\Key;
use app\domain\User;
use app\security\credentials\ApiCredentials;
use app\security\credentials\PinCredentials;
use app\security\credentials\RfidCredentials;
use app\security\credentials\TokenCredentials;
use vhs\database\Database;
use vhs\security\AnonPrincipal;
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
            case "app\\security\\credentials\\RfidCredentials":
                /** @var RfidCredentials $credentials */
                self::keyLogin(Key::findByRfid($credentials->getToken()), $credentials);
                break;
            case "app\\security\\credentials\\PinCredentials":
                /** @var PinCredentials $credentials */
                self::keyLogin(Key::findByPin($credentials->getToken()), $credentials);
                break;
            default:
                throw new InvalidCredentials("Unsupported authentication type.");
        }
    }

    private static function userLogin($username, $password) {
        $ipaddr = null;
        if(isset($_SERVER) && array_key_exists("REMOTE_ADDR", $_SERVER))
            $ipaddr = $_SERVER['REMOTE_ADDR'];

        $users = User::findByUsername($username);

        if(count($users) <> 1) {
            AccessLog::log($username, "userpass", false, $ipaddr);
            throw new InvalidCredentials("Incorrect username or password");
        }

        $user = $users[0];

        if(self::isUserValid($user) && PasswordUtil::check($password, $user->password)) {

            $membershipPrivs = array();

            if(!is_null($user->membership)) {
                $membershipPrivs = array_map(
                    function($privilege) { return $privilege->code; },
                    $user->membership->privileges->all()
                );
            }

            $privileges = array_merge(
                $membershipPrivs, array_map(
                    function($privilege) { return $privilege->code; },
                    $user->privileges->all()
                )
            );

            array_push($privileges, "user");

            CurrentUser::setPrincipal(new UserPrincipal($user->id, $privileges));

            $user->lastlogin = date(Database::DateFormat());

            if(!is_null($ipaddr))
                $user->lastip = $_SERVER['REMOTE_ADDR'];

            try {
                $user->save();
            } catch(\Exception $ex) {
                self::logout();

                throw $ex;
            }

            AccessLog::log($username, "userpass", true, $ipaddr);

        } else {
            AccessLog::log($username, "userpass", false, $ipaddr);
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
        $ipaddr = null;
        if(isset($_SERVER) && array_key_exists("REMOTE_ADDR", $_SERVER))
            $ipaddr = $_SERVER['REMOTE_ADDR'];

        if(count($keys) <> 1) {
            AccessLog::log($credentials->getToken(), $credentials->getType(), false, $ipaddr);
            throw new InvalidCredentials("Invalid key");
        }

        $key = $keys[0];
        $identity = null;

        $privileges = array_map(
            function($priviledge) { return $priviledge->code; },
            $key->privileges->all()
        );

        if(!is_null($key->userid) && $key->userid != "0") {
            try {
                $user = User::find($key->userid);
            } catch (\Exception $ex) {
                AccessLog::log($credentials->getToken(), $credentials->getType(), false, $ipaddr);
                throw new InvalidCredentials("Invalid key");
            }

            if (!is_null($user) && self::isUserValid($user)) {
                $identity = $user->id;
                if(in_array("inherit", $privileges)) {
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

        CurrentUser::setPrincipal(
            new TokenPrincipal(
                $identity,
                $privileges
            )
        );

        AccessLog::log($credentials->getToken(), $credentials->getType(), true, $ipaddr);
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
}