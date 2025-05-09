<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/5/2016
 * Time: 12:16 PM.
 */

namespace app\services;

use app\contracts\IPreferenceService1;
use app\domain\Privilege;
use app\domain\SystemPreference;
use vhs\security\CurrentUser;
use vhs\services\Service;

/** @typescript */
class PreferenceService extends Service implements IPreferenceService1 {
    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountSystemPreferences($filters) {
        return SystemPreference::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param string $key
     *
     * @return mixed
     */
    public function DeleteSystemPreference($key) {
        /** @var \app\domain\SystemPreference[] */
        $prefs = SystemPreference::findByKey($key);

        if (is_null($prefs) || count($prefs) <= 0) {
            return;
        }

        foreach ($prefs as $pref) {
            $pref->delete();
        }
    }

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetAllSystemPreferences() {
        return SystemPreference::findAll();
    }

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return mixed
     */
    public function GetSystemPreference($id) {
        /** @var \app\domain\SystemPreference */
        return SystemPreference::find($id);
    }

    /**
     * @permission administrator
     *
     * @param int                            $page
     * @param int                            $size
     * @param mixed                          $columns
     * @param mixed                          $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return \app\domain\SystemPreference[]
     */
    public function ListSystemPreferences($page, $size, $columns, $order, $filters) {
        /** @var \app\domain\SystemPreference[] */
        return SystemPreference::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param string $key
     * @param string $value
     * @param bool   $enabled
     * @param string $notes
     *
     * @return mixed
     */
    public function PutSystemPreference($key, $value, $enabled, $notes) {
        $prefs = SystemPreference::findByKey($key);

        $pref = null;

        if (count($prefs) != 1) {
            $pref = new SystemPreference();
        } else {
            $pref = $prefs[0];
        }

        $pref->key = $key;
        $pref->value = $value;
        $pref->enabled = $enabled;
        $pref->notes = $notes;

        $pref->save();

        return $pref;
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $privileges
     *
     * @return mixed
     */
    public function PutSystemPreferencePrivileges($id, $privileges) {
        /** @var \app\domain\SystemPreference */
        $pref = SystemPreference::find($id);

        if (is_null($pref)) {
            return;
        }

        $privArray = is_string($privileges) ? explode(',', $privileges) : $privileges;

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($pref->privileges->all() as $priv) {
            $pref->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            $pref->privileges->add($priv);
        }

        $pref->save();
    }

    /**
     * @permission anonymous
     *
     * @param string $key
     *
     * @return mixed
     */
    public function SystemPreference($key) {
        /** @var \app\domain\SystemPreference[] */
        $prefs = SystemPreference::findByKey($key, function ($privileges) {
            $codes = [];
            foreach ($privileges->all() as $priv) {
                array_push($codes, $priv->code);
            }

            return CurrentUser::hasAllPermissions(...$codes);
        });

        if (count($prefs) != 1) {
            return null;
        }

        return $prefs[0];
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $key
     * @param string $value
     * @param bool   $enabled
     * @param string $notes
     *
     * @return mixed
     */
    public function UpdateSystemPreference($id, $key, $value, $enabled, $notes) {
        /** @var \app\domain\SystemPreference */
        $pref = SystemPreference::find($id);

        if (is_null($pref)) {
            return;
        }

        $pref->key = $key;
        $pref->value = $value;
        $pref->enabled = $enabled;
        $pref->notes = $notes;

        $pref->save();

        return;
    }

    /**
     * @permission administrator
     *
     * @param string $key
     * @param bool   $enabled
     *
     * @return mixed
     */
    public function UpdateSystemPreferenceEnabled($key, $enabled) {
        /** @var \app\domain\SystemPreference[] */
        $prefs = SystemPreference::findByKey($key);

        $pref = null;

        if (count($prefs) != 1) {
            return;
        }

        $pref = $prefs[0];

        $pref->key = $key;
        $pref->enabled = $enabled;

        $pref->save();
    }
}
