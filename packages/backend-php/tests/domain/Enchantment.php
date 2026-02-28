<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 5:54 PM.
 */

namespace tests\domain;

use tests\schema\EnchantmentSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * @property int    $id
 * @property string $name
 * @property float  $bonus
 *
 * @extends Domain<Enchantment>
 *
 * @typescript
 */
class Enchantment extends Domain {
    /**
     * Define.
     *
     * @return void
     */
    public static function Define(): void {
        Enchantment::Schema(EnchantmentSchema::Type());

        //NOTE don't setup the same relationships on the child of a previously defined parent, this will cause a hydrate loop.
        //EnchantmentDomain::Relationship("swords", Sword::Type(), SwordEnchantmentsSchema::getInstance());
    }

    /**
     * @param ValidationResults $results
     *
     * @return void
     */
    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
