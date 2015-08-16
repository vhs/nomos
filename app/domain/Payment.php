<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:26 PM
 */

namespace app\domain;


use app\schema\PaymentSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class Payment extends Domain {
    public static function Define() {
        Payment::Schema(PaymentSchema::Type());
    }

    public function validate(ValidationResults &$results) {

    }
}