<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 5:53 PM.
 */

namespace tests\domain;

use tests\schema\KnightSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * @property int|\vhs\database\Column $id
 * @property int                      $swordid
 * @property string                   $name
 * @property string                   $birthdate
 * @property object                   $sword
 * @property object                   $rings
 *
 * @extends Domain<Knight>
 *
 * @typescript
 */
class Knight extends Domain {
    /**
     * Define.
     *
     * @return void
     */
    public static function Define(): void {
        Knight::Schema(KnightSchema::Type());
        Knight::Relationship('sword', Sword::Type()); //parent relationship aka Many to One
        Knight::Relationship('rings', Ring::Type()); //child relationship aka One to Many
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
