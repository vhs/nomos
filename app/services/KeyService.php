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
     * @permission administrator
     * @param $userid
     * @return mixed
     */
    public function GetUserPins($userid) {
        return Key::where(
            Where::_And(
                Where::Equal(Key::Schema()->Columns()->type, "pin"),
                Where::Equal(Key::Schema()->Columns()->userid, $userid)
            )
        );
    }

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetSystemPins() {
        return Key::where(
            Where::_And(
                Where::Equal(Key::Schema()->Columns()->type, "pin"),
                Where::Null(Key::Schema()->Columns()->userid)
            )
        );
    }

    /**
     * Creates a pin for a specified user
     * @permission administrator|user
     * @param $userid
     * @param $pin
     * @param $notes
     * @throws \Exception
     * @return mixed
     */
    public function CreatePin($userid, $pin, $notes) {
        $user = User::find($userid);

        if(is_null($user))
            throw new \Exception("Invalid userid");


    }

    /**
     * @permission administrator
     * @param $pin
     * @param $notes
     * @return mixed
     */
    public function CreateSystemPin($pin, $notes) {
        // TODO: Implement CreateSystemPin() method.
    }

    /**
     * Change a pin
     * @permission administrator|user
     * @param $pin
     * @return mixed
     */
    public function UpdatePin($pinid, $pin) {
        // TODO: Implement UpdatePin() method.
    }

    /**
     * @permission administrator|user
     * @param $pinid
     * @param $pin
     * @return mixed
     */
    public function PutPinPriviledges($pinid, $pin) {
        // TODO: Implement PutPinPriviledges() method.
    }

    /**
     * Deletes a specified auth key
     * @permission administrator|user
     * @param $id
     * @return mixed
     */
    public function DeletePin($id) {
        // TODO: Implement DeletePin() method.
    }
}