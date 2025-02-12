<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 18/12/2014
 * Time: 6:04 PM.
 */

namespace tests\domain;

use tests\schema\RingSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/** @typescript */
class Ring extends Domain {
    public static function Define() {
        Ring::Schema(RingSchema::Type());

        Ring::Relationship('enchantment', Enchantment::Type()); //parent relationship Many to One
    }

    /**
     * @param ValidationResults $results
     *
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
