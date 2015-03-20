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
use app\domain\Key;
use app\domain\User;
use app\schema\UserSchema;
use app\security\Authenticate;
use app\security\credentials\PinCredentials;
use vhs\database\Database;
use vhs\database\wheres\Where;
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

        $logAccess = function($granted) use ($pin) {
            try {
                AccessLog::log($pin, 'pin', $granted, $_SERVER['REMOTE_ADDR']);
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

            $logAccess(true);

            return $retval;
        }

        $logAccess(false);

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
}
