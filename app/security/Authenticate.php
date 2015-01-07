<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 6:21 PM
 */

namespace app\security;


use app\domain\Key;
use app\domain\User;
use app\security\credentials\ApiCredentials;
use app\security\credentials\PinCredentials;
use app\security\credentials\RfidCredentials;
use vhs\security\AnonPrincipal;
use vhs\security\CurrentUser;
use vhs\security\exceptions\InvalidCredentials;
use vhs\security\IAuthenticate;
use vhs\security\ICredentials;
use vhs\security\IPrincipal;
use vhs\security\UserPassCredentials;
use vhs\Singleton;
use vhs\web\HttpContext;

class Authenticate extends Singleton implements IAuthenticate {

    public function login(ICredentials $credentials) {
        switch(get_class($credentials)) {
            case "vhs\\security\\UserPassCredentials":
                /** @var UserPassCredentials $credentials */
                $this->userLogin($credentials->getUsername(), $credentials->getPassword());
                break;
            case "app\\security\\credentials\\ApiCredentials":
                /** @var ApiCredentials $credentials */
                $this->keyLogin(Key::findByApiKey($credentials->getToken()));
                break;
            case "app\\security\\credentials\\RfidCredentials":
                /** @var RfidCredentials $credentials */
                $this->keyLogin(Key::findByRfid($credentials->getToken()));
                break;
            case "app\\security\\credentials\\PinCredentials":
                /** @var PinCredentials $credentials */
                $this->keyLogin(Key::findByPin($credentials->getToken()));
                break;
            default:
                throw new InvalidCredentials("Unsupported credential type.");
        }
    }

    private function userLogin($username, $password) {
        HttpContext::Server()->log("Looking for user: " . $username);
        $users = User::findByUsername($username);

        if(count($users) <> 1)
            throw new InvalidCredentials("Incorrect username or password");

        $user = $users[0];
        HttpContext::Server()->log("found a user");
        if(!Authenticate::password_verify($password, $user->password)) {
            throw new InvalidCredentials("Incorrect username or password");
        }

        CurrentUser::setPrincipal(new UserPrincipal($user->id, array()));
    }

    private function keyLogin($keys) {
        if(count($keys) <> 1)
            throw new InvalidCredentials("Invalid key");

        $key = $keys[0];

        try {
            $user = User::find($key->userid);
        } catch(\Exception $ex) {
            throw new InvalidCredentials("Invalid key");
        }

        if(!is_null($user)) {
            CurrentUser::setPrincipal(new UserPrincipal($user->id, array()));
        }
    }

    public function logout() {
        CurrentUser::setPrincipal(new AnonPrincipal());
    }

    private static function password_verify($password, $hash) {
        if (!function_exists('crypt')) {
            trigger_error("Crypt must be loaded for password_verify to function", E_USER_WARNING);
            return false;
        }
        $ret = crypt(sha1($password), $hash);
        if (!is_string($ret) || strlen($ret) != strlen($hash) || strlen($ret) <= 13) {
            return false;
        }

        $status = 0;
        for ($i = 0; $i < strlen($ret); $i++) {
            $status |= (ord($ret[$i]) ^ ord($hash[$i]));
        }

        return $status === 0;
    }

    /**
     * @return bool
     */
    public function isAuthenticated() {
        return !CurrentUser::getPrincipal()->isAnon();
    }

    /**
     * @return IPrincipal
     */
    public function currentPrincipal() {
        return CurrentUser::getPrincipal();
    }
}