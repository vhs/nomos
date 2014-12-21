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
        key::Schema(KeySchema::getInstance());

        Key::Relationship("privileges", Privilege::Type(), KeyPrivilegeSchema::getInstance());
    }

    public function validate(ValidationResults &$results) {

    }

    public static function findByRfid($rfid) {
        return self::where(Where::_And(Where::Equal("key", $rfid), Where::Equal("type", "rfid")));
    }
}



