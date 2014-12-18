<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 5:53 PM
 */

namespace tests\domain;


use tests\schema\KnightSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class KnightDomain extends Domain {

    static function Define() {
        KnightDomain::Schema(KnightSchema::getInstance());
        KnightDomain::Relationship("sword", SwordDomain::Type());
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}