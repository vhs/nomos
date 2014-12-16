<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:05 PM
 */

namespace app\domain;


use app\schema\KeySchema;
use app\schema\UserSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\Schema;
use vhs\domain\validations\ValidationResults;

class User extends Domain {
    /**
     * @return Schema
     */
    static public function getSchema() {
        return UserSchema::getInstance();
    }

    public function validate(ValidationResults &$results) {

    }

    public function getKeys() {
        return Key::where(Where::Equal(KeySchema::Columns()->userid, $this->id));
    }
}

