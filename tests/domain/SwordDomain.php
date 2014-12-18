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

class SwordDomain extends Domain {

    static function Define() {
        SwordDomain::Schema(SwordSchema::getInstance());

        //NOTE don't setup the same relationships on the child of a previously defined parent, this will cause a hydrate loop.
        SwordDomain::Relationship("enchantments", EnchantmentDomain::Type(), SwordEnchantmentsSchema::getInstance());
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}