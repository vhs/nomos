<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 7:51 PM.
 */

namespace app\domain;

use app\schema\PasswordResetRequestSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/** @typescript */
class PasswordResetRequest extends Domain {
    public static function Define() {
        PasswordResetRequest::Schema(PasswordResetRequestSchema::Type());
    }

    public static function findByToken($token) {
        return PasswordResetRequest::where(Where::Equal(PasswordResetRequestSchema::Columns()->token, $token));
    }

    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
