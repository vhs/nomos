<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 10:48 PM.
 */

namespace app\domain;

use app\schema\AccessLogSchema;
use vhs\database\Database;
use vhs\database\orders\OrderBy;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class AccessLog extends Domain {
    public static function Define() {
        AccessLog::Schema(AccessLogSchema::Type());
    }

    public static function findLatest($limit = 5) {
        return self::where(
            Where::Equal(AccessLogSchema::Columns()->authorized, false),
            OrderBy::Descending(AccessLogSchema::Columns()->time),
            $limit
        );
    }

    public static function log($key, $type, $authorized, $from_ip, $userid = null) {
        $entry = new AccessLog();
        $entry->key = $key;
        $entry->type = $type;
        $entry->authorized = $authorized;
        $entry->from_ip = $from_ip;
        $entry->time = date(Database::DateFormat());
        $entry->userid = $userid;
        $entry->save();

        return $entry;
    }

    /**
     * @param ValidationResults $results
     *
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        return true;
    }
}
