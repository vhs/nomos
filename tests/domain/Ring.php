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

/**
 * @property int                       $id
 * @property string                    $name
 * @property int                       $knightid
 * @property int                       $enchantmentid
 * @property \tests\domain\Knight      $knight
 * @property \tests\domain\Enchantment $enchantment
 *
 * @typescript
 */
class Ring extends Domain {
    public static function Define() {
        Ring::Schema(RingSchema::Type());

        Ring::Relationship('enchantment', Enchantment::Type()); //parent relationship Many to One
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
