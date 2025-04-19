<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 5:54 PM.
 */

namespace tests\domain;

use tests\schema\SwordEnchantmentsSchema;
use tests\schema\SwordSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * @property int    $id
 * @property string $name
 * @property int    $damage
 * @property object $enchantments
 *
 * @extends Domain<Sword>
 *
 * @typescript
 */
class Sword extends Domain {
    /**
     * Define.
     *
     * @return void
     */
    public static function Define(): void {
        Sword::Schema(SwordSchema::Type());

        //NOTE don't setup the same relationships on the child of a previously defined parent, this will cause a hydrate loop.
        Sword::Relationship('enchantments', Enchantment::Type(), SwordEnchantmentsSchema::Type()); //satellite relationship aka Many to Many
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
