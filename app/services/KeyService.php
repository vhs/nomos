<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/03/2015
 * Time: 6:32 PM
 */

namespace app\services;


use app\contracts\IKeyService1;
use app\domain\Key;
use app\domain\Privilege;
use app\domain\User;
use app\schema\SettingsSchema;
use vhs\database\Database;
use vhs\database\wheres\Where;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

class KeyService extends Service implements IKeyService1 {

    public function GetSystemKeys() {
        if(!CurrentUser::hasAnyPermissions("administrator"))
            throw new UnauthorizedException();

        return Key::where(Where::Null(Key::Schema()->Columns()->userid));
    }

    public function GetAllKeys() {
        if(!CurrentUser::hasAnyPermissions("administrator"))
            throw new UnauthorizedException();

        return Key::findAll();
    }

    public function GetKey($keyid) {
        $key = Key::find($keyid);

        if(is_null($key)) throw new \Exception("Invalid keyid");

        if(!CurrentUser::hasAnyPermissions("administrator")) {
            if (is_null($key->userid) || $key->userid != CurrentUser::getIdentity())
                throw new UnauthorizedException();
        }

        return $key;
    }

    public function GetUserKeys($userid, $types) {
        if(CurrentUser::getIdentity() == $userid || CurrentUser::hasAnyPermissions("administrator")) {
            $user = User::find($userid);
            if ($user != null) {
                $keys = array();
                foreach($user->keys->all() as $key) {
                    if(in_array($key->type, $types))
                        array_push($keys, $key);
                }

                return $keys;
            }
        }

        return [];
    }

    public function GenerateUserKey($userid, $type, $value, $notes) {
        if(CurrentUser::getIdentity() == $userid || CurrentUser::hasAnyPermissions("administrator")) {

            $user = User::find($userid);

            if($user != null) {
                $key = new Key();

                switch ($type) {
                    case "rfid":
                        $key->key = $value;
                        break;
                    case "pin":
                        $nextpinid = Database::scalar(SettingsSchema::Table(), SettingsSchema::Columns()->nextpinid);
                        $key->key = sprintf("%04s", $nextpinid) . "|" . sprintf("%04s", rand(0, 9999));
                        $key->privileges->add(Privilege::findByCode("inherit"));
                        break;
                    case "api":
                        $key->key = bin2hex(openssl_random_pseudo_bytes(32));
                        break;
                    default:
                        throw new \Exception("Unsupported key type");
                }

                $key->notes = $notes;
                $key->type = $type;
                $key->userid = $userid;

                $key->save();

                return $key;
            }
        }

        return null;
    }

    public function UpdateKey($keyid, $notes, $expires) {
        $key = $this->GetKey($keyid);

        $key->notes = $notes;
        $key->expires = $expires;
        $key->save();

        return $key;
    }

    public function PutKeyPrivileges($keyid, $privileges) {
        $key = $this->GetKey($keyid);

        $privArray = $privileges;

        if(!is_array($privArray)) {
            $privArray = array();
            array_push($privArray, $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        foreach($key->privileges->all() as $priv)
            $key->privileges->remove($priv);

        foreach($privs as $priv)
            $key->privileges->add($priv);

        $key->save();
    }

    public function DeleteKey($keyid) {
        $key = $this->GetKey($keyid);

        $key->delete();
    }
}