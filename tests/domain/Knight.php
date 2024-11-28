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

class Knight extends Domain {
    public static function Define() {
        Knight::Schema(KnightSchema::Type());
        Knight::Relationship('sword', Sword::Type()); //parent relationship aka Many to One
        Knight::Relationship('rings', Ring::Type()); //child relationship aka One to Many
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
