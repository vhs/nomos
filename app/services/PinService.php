<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 6:03 PM.
 */

namespace app\services;

use app\contracts\IPinService1;
use app\domain\Key;
use app\domain\Privilege;
use app\schema\SettingsSchema;
use vhs\database\Columns;
use vhs\database\Database;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

/** @typescript */
class PinService extends Service implements IPinService1 {
    /**
     * @permission door
     *
     * @return mixed
     */
    public function AccessInstructions() {
        return 'asdf';
    }

    /**
     * Automatically generates a pin for a specified user.
     *
     * @permission administrator|user
     *
     * @param $userid
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return mixed
     */
    public function GeneratePin($userid) {
        if (!CurrentUser::hasAnyPermissions('administrator') && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $pin = $this->GetUserPin($userid);

        if (is_null($pin)) {
            $nextpinid = Database::scalar(Query::Select(SettingsSchema::Table(), new Columns(SettingsSchema::Columns()->nextpinid)));

            $key = new Key();
            $key->userid = $userid;
            $key->type = 'pin';
            $key->key = sprintf('%04s', $nextpinid) . '|' . sprintf('%04s', rand(0, 9999));
            $key->notes = 'User generated PIN';

            $pin = $key;

            $priv = Privilege::findByCode('inherit');
            if (!is_null($priv)) {
                // TODO fix typing
                /** @disregard P1006 override */
                $pin->privileges->add($priv);
            }
        }

        $pinid = explode('|', $pin->key)[0];

        $pin->key = sprintf('%04s', $pinid) . '|' . sprintf('%04s', rand(0, 9999));
        $pin->notes = 'User generated PIN';

        $pin->save();

        return $pin;
    }

    /**
     * @permission gen-temp-pin|administrator
     *
     * @param $expires
     * @param $privileges
     * @param $notes
     *
     * @return mixed
     */
    public function GenerateTemporaryPin($expires, $privileges, $notes) {
        $userid = CurrentUser::getIdentity();

        $nextpinid = Database::scalar(Query::Select(SettingsSchema::Table(), new Columns(SettingsSchema::Columns()->nextpinid)));

        $pin = new Key();
        $pin->userid = $userid;
        $pin->expires = $expires;
        $pin->type = 'pin';
        $pin->key = sprintf('%04s', $nextpinid) . '|' . sprintf('%04s', rand(0, 9999));
        $pin->notes = $notes;

        $privArray = $privileges;

        if (!is_array($privArray)) {
            $privArray = explode(',', $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        if (!is_null($privs) && is_array($privs)) {
            foreach ($privs as $priv) {
                if (CurrentUser::hasAllPermissions($priv->code)) {
                    // TODO fix typing
                    /** @disregard P1006 override */
                    $pin->privileges->add($priv);
                }
            }
        }

        $pin->save();

        return $pin;
    }

    /**
     * @permission administrator|user
     *
     * @param $userid
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return mixed
     */
    public function GetUserPin($userid) {
        if (!CurrentUser::hasAnyPermissions('administrator') && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $keys = Key::where(Where::_And(Where::Equal(Key::Schema()->Columns()->type, 'pin'), Where::Equal(Key::Schema()->Columns()->userid, $userid)));

        if (count($keys) >= 1) {
            return $keys[0];
        }

        return null;
    }

    /**
     * @permission administrator|user
     *
     * @param $keyid
     * @param $pin
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return void
     */
    public function UpdatePin($keyid, $pin) {
        /** @var \app\domain\Key */
        $key = Key::find($keyid);

        if (!CurrentUser::hasAnyPermissions('administrator') && $key->userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $pinid = explode('|', $key->key)[0];

        $key->key = $pinid . '|' . sprintf('%04s', intval($pin));

        $key->save();
    }

    /**
     * Change a pin.
     *
     * @permission administrator|user
     *
     * @param $userid
     * @param $pin
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return mixed
     */
    public function UpdateUserPin($userid, $pin) {
        if (!CurrentUser::hasAnyPermissions('administrator') && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $pinObj = $this->GetUserPin($userid);

        if (is_null($pin)) {
            $pinObj = $this->GeneratePin($userid);
        }

        $pinid = explode('|', $pinObj->key)[0];

        $pinObj->key = $pinid . '|' . $pin;

        $pinObj->save();

        return $pinObj;
    }
}
