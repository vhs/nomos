<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:26 PM
 */

namespace app\domain;


use app\schema\PrivilegeSchema;
use vhs\domain\Domain;
use vhs\domain\Schema;
use vhs\domain\validations\ValidationResults;

class Privilege extends Domain {
    /**
     * @return Schema
     */
    public static function getSchema() {
        return PrivilegeSchema::getInstance();
    }

    public function validate(ValidationResults &$results) {

    }
}