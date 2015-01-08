<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:05 PM
 */

namespace app\domain;


use app\schema\UserSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class User extends Domain {
    public static function Define() {
        User::Schema(UserSchema::getInstance());
        User::Relationship("keys", Key::Type());
        User::Relationship("membership", Membership::Type());
    }

    public function validate(ValidationResults &$results) {

    }

    public static function findByUsername($username) {
        return User::where(
            Where::Equal(UserSchema::Columns()->username, $username)
        );
    }
}

