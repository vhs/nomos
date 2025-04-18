<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:05 PM.
 */

namespace app\domain;

use app\dto\UserActiveEnum;
use app\schema\UserPrivilegeSchema;
use app\schema\UserSchema;
use DateTime;
use vhs\database\Database;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationFailure;
use vhs\domain\validations\ValidationResults;

/**
 *  User domain implementation.
 *
 * @method static \app\domain\User|null find(int $primaryKeyValues)
 *
 * @property int              $id
 * @property string           $username
 * @property string           $password
 * @property int              $membership_id
 * @property \DateTime|string $mem_expire
 * @property bool             $trial_used
 * @property string           $email
 * @property string           $fname
 * @property string           $lname
 * @property string|null      $token
 * @property string           $cookie_id
 * @property bool             $newsletter
 * @property bool             $cash
 * @property int              $userlevel
 * @property string           $notes
 * @property \DateTime|string $created
 * @property \DateTime|string $lastlogin
 * @property string           $lastip
 * @property string           $avatar
 * @property string           $active
 * @property string           $paypal_id
 * @property string           $payment_email
 * @property string           $stripe_id
 * @property string           $stripe_email
 * @property bool             $valid
 * @property object           $membership
 * @property object           $privileges
 * @property object           $keys
 *
 * @typescript
 */
class User extends Domain {
    /**
     * @return void
     */
    public static function Define() {
        User::Schema(UserSchema::Type());
        User::Relationship('keys', Key::Type());
        User::Relationship('membership', Membership::Type());
        User::Relationship('privileges', Privilege::Type(), UserPrivilegeSchema::Type());
    }

    /**
     * @param string|null $username
     * @param string|null $email
     *
     * @return bool
     */
    public static function exists($username = null, $email = null) {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        $usernameWhere = Where::Equal(UserSchema::Columns()->username, $username);

        // TODO implement proper typing
        // @phpstan-ignore property.notFound
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

    /**
     * @param string $email
     *
     * @return User[]|null
     */
    public static function findByEmail($email) {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        return User::where(Where::Equal(UserSchema::Columns()->email, $email));
    }

    /**
     * @param string $email
     *
     * @return User[]|null
     */
    public static function findByPaymentEmail($email) {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        return User::where(Where::Equal(UserSchema::Columns()->payment_email, $email));
    }

    /**
     * findByToken.
     *
     * @param mixed $token
     *
     * @return User[]|null
     */
    public static function findByToken($token) {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        return User::where(Where::Equal(UserSchema::Columns()->token, $token));
    }

    /**
     * @param string $username
     *
     * @return User[]|null
     */
    public static function findByUsername($username) {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        return User::where(Where::Equal(UserSchema::Columns()->username, $username));
    }

    /**
     * Magic field interface method for 'valid'.
     *
     * @return bool
     */
    public function get_valid() {
        // Check if account is active
        if ($this->active != UserActiveEnum::ACTIVE->value) {
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
     * getGrantCodes.
     *
     * @return array<string>
     */
    public function getGrantCodes() {
        $grants = [];

        // TODO fix typing
        /** @disregard P1006 override */
        foreach ($this->privileges->all() as $priv) {
            if (strpos($priv->code, 'grant:') === 0) {
                array_push($grants, substr($priv->code, 6));
            }
        }

        return $grants;
    }

    /**
     * Get a friendly error message for user validity.
     *
     * @return 'Account expired'|'Account is not active'|'Unknown error'|false
     */
    public function getInvalidReason() {
        if ($this->valid) {
            return false;
        }

        // Check if account is active
        if ($this->active != UserActiveEnum::ACTIVE->value) {
            return 'Account is not active';
        }

        // check if membership has expired
        if ($this->hasExpired()) {
            return 'Account expired';
        }

        return 'Unknown error';
    }

    /**
     * getPrivilegeCodes.
     *
     * @return string[]
     */
    public function getPrivilegeCodes() {
        $codes = [];

        // TODO fix typing
        /** @disregard P1006 override */
        foreach ($this->privileges->all() as $priv) {
            array_push($codes, $priv->code);
        }

        return $codes;
    }

    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }

    /**
     * Check if user account has expired.
     *
     * @return bool
     */
    private function hasExpired() {
        return new DateTime($this->mem_expire) < new DateTime();
    }

    /**
     * validateEmail.
     *
     * @param \vhs\domain\validations\ValidationResults $results
     *
     * @return void
     */
    // @phpstan-ignore method.unused
    private function validateEmail(ValidationResults &$results) {
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $results->add(new ValidationFailure('Invalid e-mail address'));
        }
    }
}
