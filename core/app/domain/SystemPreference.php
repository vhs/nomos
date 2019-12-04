<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/5/2016
 * Time: 10:46 AM
 */

namespace app\domain;


use app\schema\SystemPreferencePrivilegeSchema;
use app\schema\SystemPreferenceSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class SystemPreference extends Domain {

    static function Define() {
        SystemPreference::Schema(SystemPreferenceSchema::Type());

        SystemPreference::Relationship("privileges", Privilege::Type(), SystemPreferencePrivilegeSchema::Type());
    }

    /**
     * @param $key
     * @param callable|null $accessCheck Privilege[] returns bool
     * @return array
     */
    public static function findByKey($key, callable $accessCheck = null) {
        $prefs = SystemPreference::where(
            Where::Equal(SystemPreferenceSchema::Columns()->key, $key)
        );

        if (is_null($prefs) || count($prefs) == 0 || is_null($accessCheck))
            return $prefs;

        $accessiblePrefs = array();

        /** @var SystemPreference $pref */
        foreach($prefs as $pref) {
            if($accessCheck($pref->privileges))
               array_push($accessiblePrefs, $pref);
        }

        return $accessiblePrefs;
    }

    /**
     * @param $key
     * @param callable|null $accessCheck Privilege[] returns bool
     * @return string
     */
    public static function findByKeyScalar($key, callable $accessCheck = null) {
        $prefs = SystemPreference::findByKey($key, $accessCheck);

        if (count($prefs) != 1)
            return;

        return $prefs[0];
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results)
    {
        // TODO: Implement validate() method.
    }
}