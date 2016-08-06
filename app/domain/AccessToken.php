<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/5/2016
 * Time: 6:30 PM
 */

namespace app\domain;


use app\schema\AccessTokenSchema;
use vhs\database\orders\OrderBy;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class AccessToken extends Domain {
    public static function Define() {
        AccessToken::Schema(AccessTokenSchema::Type());
        AccessToken::Relationship("user", User::Type());
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        return true;
    }

    public static function findByToken($token) {
        return self::where(
            Where::Equal(AccessTokenSchema::Columns()->token, $token),
            OrderBy::Descending(AccessTokenSchema::Columns()->expires),
            1
        );
    }
}
