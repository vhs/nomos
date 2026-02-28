<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/5/2016
 * Time: 10:46 AM.
 */

namespace app\domain;

use app\schema\SystemPreferencePrivilegeSchema;
use app\schema\SystemPreferenceSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * @property int    $id
 * @property string $key
 * @property string $value
 * @property bool   $enabled
 * @property string $notes
 * @property object $privileges
 *
 * @extends Domain<SystemPreference>
 *
 *  @typescript
 */
class SystemPreference extends Domain {
    /**
     * Define.
     *
     * @return void
     */
    public static function Define(): void {
        SystemPreference::Schema(SystemPreferenceSchema::Type());

        SystemPreference::Relationship('privileges', Privilege::Type(), SystemPreferencePrivilegeSchema::Type());
    }

    /**
     * @param string        $key
     * @param callable|null $accessCheck Privilege[] returns bool
     *
     * @return SystemPreference[]
     */
    public static function findByKey($key, ?callable $accessCheck = null) {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        $prefs = SystemPreference::where(Where::Equal(SystemPreferenceSchema::Columns()->key, $key));

        if (is_null($prefs) || count($prefs) == 0 || is_null($accessCheck)) {
            return $prefs;
        }

        $accessiblePrefs = [];

        /** @var SystemPreference $pref */
        foreach ($prefs as $pref) {
            if ($accessCheck($pref->privileges)) {
                array_push($accessiblePrefs, $pref);
            }
        }

        return $accessiblePrefs;
    }

    /**
     * validate.
     *
     * @param \vhs\domain\validations\ValidationResults $results
     *
     * @return void
     */
    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
