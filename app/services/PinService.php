<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 6:03 PM
 */

namespace app\services;


use app\contracts\IPinService1;
use app\domain\Key;
use app\schema\SettingsSchema;
use vhs\database\Database;
use vhs\database\wheres\Where;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

class PinService extends Service implements IPinService1 {

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
            $key->key = sprintf("%04s", $nextpinid) . "|" . sprintf("%04s", rand(0, 9999));
            $key->notes = "User generated PIN";

            $pin = $key;
        }

        $pinid = explode("|", $pin->key)[0];

        $pin->key = sprintf("%04s", $pinid) . "|" . sprintf("%04s", rand(0, 9999));
        $pin->notes = "User generated PIN";

        $pin->save();

        return $pin;
    }

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

    public function UpdatePin($keyid, $pin) {
        $key = Key::find($keyid);

        if(!CurrentUser::hasAnyPermissions("administrator") && $key->userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $pinid = explode("|", $key->key)[0];

        $key->key = $pinid . "|" . intval($pin);

        $key->save();
    }

    public function AccessInstructions() {
        return "asdf";
    }
}