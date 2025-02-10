<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/5/2016
 * Time: 12:16 PM.
 */

namespace app\handlers\v2;

use app\contracts\v2\IPreferenceService2;
use app\domain\Privilege;
use app\domain\SystemPreference;
use vhs\security\CurrentUser;
use vhs\services\Service;

/** @typescript */
class PreferenceServiceHandler2 extends Service implements IPreferenceService2 {
    /**
     * @permission administrator
     *
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountSystemPreferences($filters): int {
        return SystemPreference::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param string $key
     *
     * @throws string
     *
     * @return void
     */
    public function DeleteSystemPreference($key): void {
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
     * @throws string
     *
     * @return \app\domain\SystemPreference[]
     */
    public function GetAllSystemPreferences(): array {
        return SystemPreference::findAll();
    }

    /**
     * @permission administrator
     *
     * @param int|int[] $id
     *
     * @throws string
     *
     * @return \app\domain\SystemPreference
     */
    public function GetSystemPreference($id): SystemPreference {
        return SystemPreference::find($id);
    }

    /**
     * @permission administrator
     *
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @throws string
     *
     * @return \app\domain\SystemPreference[]
     */
    public function ListSystemPreferences($page, $size, $columns, $order, $filters): array {
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
     * @throws string
     *
     * @return \app\domain\SystemPreference
     */
    public function PutSystemPreference($key, $value, $enabled, $notes): SystemPreference {
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
     * @param int|int[]       $id
     * @param string|string[] $privileges
     *
     * @throws string
     *
     * @return bool
     */
    public function PutSystemPreferencePrivileges($id, $privileges): bool {
        $pref = SystemPreference::find($id);

        if (is_null($pref)) {
            return false;
        }

        $privArray = $privileges;

        if (!is_array($privArray)) {
            $privArray = explode(',', $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($pref->privileges->all() as $priv) {
            $pref->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            $pref->privileges->add($priv);
        }

        return $pref->save();
    }

    /**
     * @permission anonymous
     *
     * @param string $key
     *
     * @throws string
     *
     * @return \app\domain\SystemPreference|null
     */
    public function SystemPreference($key): SystemPreference|null {
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
     * @param int|int[] $id
     * @param string    $key
     * @param string    $value
     * @param bool      $enabled
     * @param string    $notes
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateSystemPreference($id, $key, $value, $enabled, $notes): bool {
        $pref = SystemPreference::find($id);

        if (is_null($pref)) {
            throw new \vhs\domain\exceptions\DomainException('SystemPreference not found', 404);
        }

        $pref->key = $key;
        $pref->value = $value;
        $pref->enabled = $enabled;
        $pref->notes = $notes;

        return $pref->save();
    }

    /**
     * @permission administrator
     *
     * @param string $key
     * @param bool   $enabled
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateSystemPreferenceEnabled($key, $enabled): bool {
        $prefs = SystemPreference::findByKey($key);

        $pref = null;

        if (count($prefs) != 1) {
            throw new \vhs\domain\exceptions\DomainException('SystemPreference not found', 404);
        }

        $pref = $prefs[0];

        $pref->key = $key;
        $pref->enabled = $enabled;

        return $pref->save();
    }
}
