<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:05 PM
 */

namespace app\domain;

use DateTime;
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
        User::Relationship('keys', Key::Type());
        User::Relationship('membership', Membership::Type());
        User::Relationship('privileges', Privilege::Type(), UserPrivilegeSchema::Type());
    }

    public function getPrivilegeCodes() {
        $codes = [];

        foreach ($this->privileges->all() as $priv) {
            array_push($codes, $priv->code);
        }

        return $codes;
    }

    public function getGrantCodes() {
        $grants = [];
        foreach ($this->privileges->all() as $priv) {
            if (strpos($priv->code, 'grant:') === 0) {
                array_push($grants, substr($priv->code, 6));
            }
        }

        return $grants;
    }

    public function validate(ValidationResults &$results) {
        $this->validateEmail($results);
    }

    private function validateEmail(ValidationResults &$results) {
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $results->add(new ValidationFailure('Invalid e-mail address'));
        }
    }

    /**
     * @param $username
     * @return User[]
     */
    public static function findByUsername($username) {
        return User::where(Where::Equal(UserSchema::Columns()->username, $username));
    }

    /**
     * @param $email
     * @return User[]
     */
    public static function findByEmail($email) {
        return User::where(Where::Equal(UserSchema::Columns()->email, $email));
    }

    /**
     * @param $email
     * @return User[]
     */
    public static function findByPaymentEmail($email) {
        return User::where(Where::Equal(UserSchema::Columns()->payment_email, $email));
    }

    /**
     * @param string|null $username
     * @param string|null $email
     * @return boolean
     */
    public static function exists($username = null, $email = null) {
        $usernameWhere = Where::Equal(UserSchema::Columns()->username, $username);
        $emailWhere = Where::Equal(UserSchema::Columns()->email, $email);
        $where = null;

        if (!is_null($username) && !is_null($email)) {
            $where = Where::_Or($usernameWhere, $emailWhere);
        } elseif (!is_null($email)) {
            $where = $emailWhere;
        } else {
            $where = $usernameWhere;
        }

        return Database::exists(Query::select(UserSchema::Table(), UserSchema::Columns(), $where));
    }

    public static function findByToken($token) {
        return User::where(Where::Equal(UserSchema::Columns()->token, $token));
    }

    /**
     * Check if user account has expired
     *
     * @return boolean
     */
    private function hasExpired() {
        return new DateTime($this->mem_expire) < new DateTime();
    }

    /**
     * Magic field interface method for 'valid'
     * @return boolean
     */
    public function get_valid() {
        // Check if account is active
        if ($this->active != 'y') {
            return false;
        }

        // Check for administrator privilege
        // We don't want to accidentally lock out administrators
        // TODO: improve this
        $privs = $this->getPrivilegeCodes();
        if (in_array('administrator', $privs)) {
            return true;
        }

        // check if membership has expired
        return !$this->hasExpired();
    }

    /**
     * Get a friendly error message for user validity
     * @return mixed
     */
    public function getInvalidReason() {
        if ($this->valid) {
            return false;
        }

        // Check if account is active
        if ($this->active != 'y') {
            return 'Account is not active';
        }

        // check if membership has expired
        if ($this->hasExpired()) {
            return 'Account expired';
        }

        return 'Unknown error';
    }
}
