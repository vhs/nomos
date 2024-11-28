<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/6/2016
 * Time: 1:11 PM
 */

namespace app\domain;

use app\schema\RefreshTokenSchema;
use vhs\database\orders\OrderBy;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class RefreshToken extends Domain {
    public static function Define() {
        RefreshToken::Schema(RefreshTokenSchema::Type());
        RefreshToken::Relationship('user', User::Type());
        RefreshToken::Relationship('client', AppClient::Type());
    }

    public static function findByToken($token) {
        $tokens = self::where(
            Where::Equal(RefreshTokenSchema::Columns()->token, $token),
            OrderBy::Descending(RefreshTokenSchema::Columns()->expires),
            1
        );

        if (count($tokens) === 1) {
            return $tokens[0];
        }

        return null;
    }

    /**
     * @param  ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        return true;
    }
}
