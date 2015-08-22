<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:05 PM
 */

namespace app\domain;


use app\schema\UserPrivilegeSchema;
use app\schema\UserSchema;
use vhs\database\Database;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationFailure;
use vhs\domain\validations\ValidationResults;

class User extends Domain {
    public static function Define() {
        User::Schema(UserSchema::Type());
        User::Relationship("keys", Key::Type());
        User::Relationship("membership", Membership::Type());
        User::Relationship("privileges", Privilege::Type(), UserPrivilegeSchema::Type());
    }

    public function validate(ValidationResults &$results) {

        $this->validateEmail($results);

    }

    private function validateEmail(ValidationResults &$results) {
        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL))
            $results->add(new ValidationFailure("Invalid e-mail address"));
    }

    public static function findByUsername($username) {
        return User::where(
            Where::Equal(UserSchema::Columns()->username, $username)
        );
    }

    public static function findByEmail($email) {
        return User::where(
            Where::Equal(UserSchema::Columns()->email, $email)
        );
    }

    public static function exists($username = null, $email = null) {
        $usernameWhere = Where::Equal(UserSchema::Columns()->username, $username);
        $emailWhere = Where::Equal(UserSchema::Columns()->email, $email);
        $where = null;

        if (!is_null($username) && !is_null($email))
            $where = Where::_Or($usernameWhere, $emailWhere);
        else if (!is_null($email))
            $where = $emailWhere;
        else
            $where = $usernameWhere;

        return Database::exists(Query::select(UserSchema::Table(), UserSchema::Columns(), $where));
    }
}

