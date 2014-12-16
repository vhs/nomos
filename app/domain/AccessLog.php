<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 10:48 PM
 */

namespace app\domain;

use app\schema\AccessLogSchema;
use vhs\database\orders\OrderBy;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\Schema;
use vhs\domain\validations\ValidationResults;

class AccessLog extends Domain {

    /**
     * @return Schema
     */
    public static function getSchema() {
        return AccessLogSchema::getInstance();
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        return true;
    }

    public static function findLatest($limit = 5) {
        self::hydrateMany(
            Where::Equal(AccessLogSchema::Columns()->authorized, false),
            OrderBy::Descending(AccessLogSchema::Columns()->time),
            $limit
        );
    }
}