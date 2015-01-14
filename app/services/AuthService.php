<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:30 PM
 */

namespace app\services;


use app\contracts\IAuthService1;
use app\domain\Key;
use app\domain\User;
use app\security\Authenticate;
use app\security\credentials\PinCredentials;
use vhs\security\CurrentUser;
use vhs\security\UserPassCredentials;

class AuthService implements IAuthService1 {

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
            return "Access Denied";
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
        $user = User::find(CurrentUser::getIdentity());

        return $user->username;
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
        $retval = array();
        $retval["valid"] = false;
        $retval["type"] = null;

        $keys = Key::findByPin($pin);

        if(count($keys) <> 1)
            return $retval;

        $key = $keys[0];

        if($key->userid == null)
            return $retval;

        $user = User::find($key->userid);

        if($user->active == 'y') {
            $retval["valid"] = true;
            $retval["type"] = $user->membership->code;
            return $retval;
        }

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

        $keys = Key::findByRfid($rfid);

        if(count($keys) <> 1)
            return $retval;

        $key = $keys[0];

        if($key->userid == null)
            return $retval;

        $user = User::find($key->userid);

        if($user->active == 'y') {
            $retval["valid"] = true;
            $retval["type"] = $user->membership->code;
            return $retval;
        }

        return $retval;
    }
}