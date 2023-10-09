<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 5:54 PM
 */

namespace tests\domain;

use tests\schema\EnchantmentSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class Enchantment extends Domain {
    public static function Define() {
        Enchantment::Schema(EnchantmentSchema::Type());

        //NOTE don't setup the same relationships on the child of a previously defined parent, this will cause a hydrate loop.
        //EnchantmentDomain::Relationship("swords", Sword::Type(), SwordEnchantmentsSchema::getInstance());
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
