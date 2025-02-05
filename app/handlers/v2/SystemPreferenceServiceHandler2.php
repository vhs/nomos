<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/5/2016
 * Time: 12:16 PM.
 */

namespace app\handlers\v2;

use app\contracts\v2\ISystemPreferenceService2;
use app\domain\Privilege;
use app\domain\SystemPreference;
use vhs\security\CurrentUser;
use vhs\services\Service;

/** @typescript */
class SystemPreferenceServiceHandler2 extends Service implements ISystemPreferenceService2 {
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
     * @param string|string[] $keys
     *
     * @throws string
     */
    public function DeleteSystemPreference($keys): void {
        $prefs = $this->getSystemPreferencesByKey($keys);

        if (is_null($prefs) || empty($prefs)) {
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
     * @param mixed $id
     * @param SystemPreference['key'] $key
     *
     * @throws string
     *
     * @return \app\domain\SystemPreference
     */
    public function GetSystemPreference($id): SystemPreference {
        return $this->getSystemPreferenceById($id);
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
     * @return bool
     */
    public function PutSystemPreference($key, $value, $enabled, $notes): bool {
        $pref = $this->getSystemPreferencesByKey($key, true);

        if (is_null($pref)) {
            $pref = new SystemPreference();
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
     * @param int    $id
     * @param string $privileges
     *
     * @throws string
     *
     * @return bool
     */
    public function PutSystemPreferencePrivileges($id, $privileges): bool {
        $pref = $this->getSystemPreferenceById($id);

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
     * @return \app\domain\SystemPreference
     */
    public function SystemPreference($key): SystemPreference {
        $prefs = SystemPreference::findByKey($key, function ($privileges) {
            $codes = [];
            foreach ($privileges->all() as $priv) {
                array_push($codes, $priv->code);
            }

            return CurrentUser::hasAllPermissions(...$codes);
        });

        if (count($prefs) != 1) {
            throw new \vhs\domain\exceptions\DomainException('Invalid SystemPreference result', 401);
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
     * @throws string
     *
     * @return bool
     */
    public function UpdateSystemPreference($id, $key, $value, $enabled, $notes): bool {
        $pref = $this->getSystemPreferenceById($id);

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
        $pref = $this->getSystemPreferencesByKey($key);

        $pref->key = $key;
        $pref->enabled = $enabled;

        return $pref->save();
    }

    /**
     * getSystemPreferenceById.
     *
     * @param mixed $id
     *
     * @throws string
     *
     * @return SystemPreference
     */
    private function getSystemPreferenceById($id): SystemPreference {
        $pref = SystemPreference::find($id);

        if (is_null($pref)) {
            $this->throwNotFound('SystemPreference');
        }

        return $pref;
    }

    /**
     * getSystemPreferencesByKey.
     *
     * @param string|string[] $keys
     * @param bool            $single
     *
     * @throws string
     *
     * @return \app\domain\SystemPreference|SystemPreference[]
     */
    private function getSystemPreferencesByKey($keys, $single = true): array|SystemPreference|null {
        $prefs = SystemPreference::findByKey($keys);

        if ($single && count($prefs) != 1) {
            $this->throwNotFound('SystemPreference');
        }

        return $single ? $prefs[0] : $prefs;
    }
}
