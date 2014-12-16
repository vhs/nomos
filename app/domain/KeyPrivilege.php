<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/12/2014
 * Time: 12:38 AM
 */

namespace app\domain;


use app\schema\KeyPrivilegeSchema;
use vhs\domain\Domain;
use vhs\domain\Schema;
use vhs\domain\validations\ValidationResults;

class KeyPrivilege extends Domain {
    /**
     * @return Schema
     */
    public static function getSchema() {
        return KeyPrivilegeSchema::getInstance();
    }

    public function validate(ValidationResults &$results) {

    }

    protected function hydrate($primaryKeyValue = null) {
        return false; // cannot hydrate composite keys
    }

    public function delete() {

    }
}