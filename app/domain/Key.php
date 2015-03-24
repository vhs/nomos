<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:23 PM
 */

namespace app\domain;

use app\schema\KeyPrivilegeSchema;
use app\schema\KeySchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class Key extends Domain {
    public static function Define() {
        Key::Schema(KeySchema::Type());

        Key::Relationship("privileges", Privilege::Type(), KeyPrivilegeSchema::Type());
    }

    public function validate(ValidationResults &$results) {

    }

    public function getAbsolutePrivileges() {
        $privs = array();

        foreach($this->privileges->all() as $priv) {
            if($priv->code === "inherit" && $this->userid != null) {
                $user = User::find($this->userid);

                if($user != null) {
                    foreach ($user->privileges->all() as $userpriv) {
                        array_push($privs, $userpriv);
                    }
                }
            }

            array_push($privs, $priv);
        }

        return array_unique($privs);
    }

    public static function findByTypes(...$types) {
        return self::where(Where::In(KeySchema::Columns()->type, $types));
    }

    public static function findByRfid($rfid) {
        return self::where(Where::_And(
            Where::Equal(KeySchema::Columns()->type, "rfid"),
            Where::Equal(KeySchema::Columns()->key, $rfid)
        ));
    }

    public static function findByApiKey($key) {
        return self::where(Where::_And(
            Where::Equal(KeySchema::Columns()->type, "api"),
            Where::Equal(KeySchema::Columns()->key, $key)
        ));
    }

    public static function findByPin($pin) {
        return self::where(Where::_And(
            Where::Equal(KeySchema::Columns()->type, "pin"),
            Where::Equal(KeySchema::Columns()->key, $pin)
        ));
    }

    public static function getSystemApiKeys() {
        return self::where(Where::_And(
            Where::Null(KeySchema::Columns()->userid),
            Where::Equal(KeySchema::Columns()->type, "rfid")
        ));
    }

    public static function getUserApiKeys($userid) {
        return self::where(
            Where::_And(
                Where::Equal(Key::Schema()->Columns()->type, "api"),
                Where::Equal(Key::Schema()->Columns()->userid, $userid)
            )
        );
    }
}



