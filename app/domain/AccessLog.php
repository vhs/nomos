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

/**
 * @property int      $id
 * @property string   $key
 * @property string   $type
 * @property bool     $authorized
 * @property string   $from_ip
 * @property string   $time
 * @property int|null $userid
 *
 * @extends Domain<AccessLog>
 *
 * @typescript
 */
class AccessLog extends Domain {
    /**
     * Define.
     *
     * @return void
     */
    public static function Define(): void {
        AccessLog::Schema(AccessLogSchema::Type());
    }

    /**
     * findLatest.
     *
     * @param int $limit
     *
     * @return AccessLog[]
     */
    public static function findLatest($limit = 5) {
        return self::where(
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Where::Equal(AccessLogSchema::Columns()->authorized, false),
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            OrderBy::Descending(AccessLogSchema::Columns()->time),
            $limit
        );
    }

    /**
     * log.
     *
     * @param string   $key
     * @param string   $type
     * @param bool     $authorized
     * @param string   $from_ip
     * @param int|null $userid
     *
     * @return AccessLog
     */
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
