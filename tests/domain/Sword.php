<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 5:54 PM
 */

namespace tests\domain;

use tests\schema\SwordEnchantmentsSchema;
use tests\schema\SwordSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class Sword extends Domain {
    public static function Define() {
        Sword::Schema(SwordSchema::Type());

        //NOTE don't setup the same relationships on the child of a previously defined parent, this will cause a hydrate loop.
        Sword::Relationship('enchantments', Enchantment::Type(), SwordEnchantmentsSchema::Type()); //satellite relationship aka Many to Many
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
