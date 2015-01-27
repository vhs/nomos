<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:05 PM
 */

namespace app\domain;


use app\schema\EmailSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class Email extends Domain {
    public static function Define() {
        Email::Schema(EmailSchema::Type());
    }

    public function validate(ValidationResults &$results) {

    }

    public static function findById($Id) {
        return Email::where(
            Where::Equal(EmailSchema::Columns()->id, $Id)
        );
    }
}

