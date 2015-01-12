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
use vhs\domain\validations\ValidationResults;

class AccessLog extends Domain {
    public static function Define() {
        AccessLog::Schema(AccessLogSchema::Type());
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        return true;
    }

    public static function log($rfid_key, $authorized, $from_ip) {
        $entry = new AccessLog();
        $entry->rfid_key = $rfid_key;
        $entry->$authorized = $authorized;
        $entry->$from_ip = $from_ip;
        $entry->save();

        return $entry;
    }

    public static function findLatest($limit = 5) {
        return self::where(
            Where::Equal(AccessLogSchema::Columns()->authorized, false),
            OrderBy::Descending(AccessLogSchema::Columns()->time),
            $limit
        );
    }
}