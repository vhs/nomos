<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/20/2015
 * Time: 12:22 PM
 */

namespace app\domain;


use app\schema\GenuineCardSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class GenuineCard extends Domain {
    public static function Define() {
        GenuineCard::Schema(GenuineCardSchema::Type());
    }

    public function validate(ValidationResults &$results) {

    }

    /**
     * @param $key
     * @return GenuineCard[]
     */
    public static function findByKey($key) {
        return GenuineCard::where(
            Where::Equal(GenuineCardSchema::Columns()->key, $key)
        );
    }
}

