<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:05 PM
 */

namespace app\domain;


use app\schema\StripeEventSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class StripeEvent extends Domain
{
    public static function Define()
    {
        StripeEvent::Schema(StripeEventSchema::Type());
    }

    public function validate(ValidationResults &$results)
    {
    }
}
