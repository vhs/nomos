<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 6:03 PM
 */

namespace app\services;


use app\contracts\IApiKeyService1;
use app\contracts\IPinService1;
use app\domain\Key;
use app\domain\Privilege;
use app\domain\User;
use app\schema\SettingsSchema;
use vhs\database\Database;
use vhs\database\wheres\Where;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;

class KeyService implements IApiKeyService1, IPinService1 {

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetApiKeys() {
        return Key::where(
            Where::Equal(Key::Schema()->Columns()->type, "api")
        );
    }

    /**
     * @permission administrator|user
     * @param $userid
     * @return mixed
     */
    public function GetUserApiKeys($userid) {
        return Key::where(
            Where::_And(
                Where::Equal(Key::Schema()->Columns()->type, "api"),
                Where::Equal(Key::Schema()->Columns()->userid, $userid)
            )
        );
    }

    /**
     * @permission administrator
     * @param $key
     * @param $notes
     * @return mixed
     */
    public function CreateSystemApiKey($key, $notes) {
        $apiKey = new Key();
        $apiKey->key = $key;
        $apiKey->type = "api";
        $apiKey->notes = $notes;
        $apiKey->save();

        return $apiKey->id;
    }

    /**
     * @permission administrator|user
     * @param $userid
     * @param $key
     * @param $notes
     * @throws \Exception
     * @return mixed
     */
    public function CreateUserApiKey($userid, $key, $notes) {
        $user = User::find($userid);

        if(is_null($user))
            throw new \Exception("Invalid userid");

        $apiKey = new Key();
        $apiKey->key = $key;
        $apiKey->type = "api";
        $apiKey->notes = $notes;

        $user->keys->add($apiKey);
        $user->save();

        return $apiKey->id;
    }

    /**
     * @permission administrator|user
     * @param $keyid
     * @param $priviledges
     * @throws \Exception
     * @return mixed
     */
    public function PutApiKeyPriviledges($keyid, $priviledges) {
        $key = Key::find($keyid);

        if(is_null($key))
            throw new \Exception("Invalid keyid");

        $key->priviledges->clear();

        $privs = Privilege::findByCodes(...$priviledges);

        $key->priviledges->add($privs);

        $key->save();
    }

    /**
     * @permission administrator|user
     * @param $keyid
     * @throws UnauthorizedException
     * @return mixed
     */
    public function DeleteApiKey($keyid) {
        $key = Key::find($keyid);

        if(!CurrentUser::hasAnyPermissions("administrator") && $key->userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException("Insufficient priviledge");
        }

        $key->delete();
    }

    /**
     * @permission administrator|user
     * @param $userid
     * @return mixed
     * @throws UnauthorizedException
     */
    public function GetUserPin($userid) {
        if(!CurrentUser::hasAnyPermissions("administrator") && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $keys = Key::where(
            Where::_And(
                Where::Equal(Key::Schema()->Columns()->type, "pin"),
                Where::Equal(Key::Schema()->Columns()->userid, $userid)
            )
        );

        if(count($keys) >= 1) return $keys[0];

        return null;
    }

    /**
     * Automatically generates a pin for a specified user
     * @permission administrator|user
     * @param $userid
     * @return mixed
     * @throws UnauthorizedException
     */
    public function GeneratePin($userid) {
        if(!CurrentUser::hasAnyPermissions("administrator") && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $pin = $this->GetUserPin($userid);

        if(is_null($pin)) {
            $nextpinid = Database::scalar(SettingsSchema::Table(), SettingsSchema::Columns()->nextpinid);

            $key = new Key();
            $key->userid = $userid;
            $key->type = 'pin';
            $key->key = $nextpinid . "|" . rand(0, 9999);
            $key->notes = "User generated PIN";

            $pin = $key;
        }

        $pinid = explode("|", $pin->key)[0];

        $pin->key = $pinid . "|" . rand(0, 9999);
        $pin->notes = "User generated PIN";

        $pin->save();

        return $pin;
    }

    /**
     * Change a pin
     * @permission administrator|user
     * @param $pin
     * @return mixed
     * @throws UnauthorizedException
     */
    public function UpdateUserPin($userid, $pin) {
        if(!CurrentUser::hasAnyPermissions("administrator") && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $pinObj = $this->GetUserPin($userid);

        if(is_null($pin))
            $pinObj = $this->GeneratePin($userid);

        $pinid = explode("|", $pinObj->key)[0];

        $pinObj->key = $pinid . "|" . $pin;

        $pinObj->save();

        return $pinObj;
    }
}