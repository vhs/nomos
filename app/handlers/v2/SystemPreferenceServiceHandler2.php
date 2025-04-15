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
use vhs\exceptions\HttpException;
use vhs\security\CurrentUser;
use vhs\services\Service;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class SystemPreferenceServiceHandler2 extends Service implements ISystemPreferenceService2 {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
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
     * @return void
     */
    public function DeleteSystemPreference($keys): void {
        $prefs = $this->getSystemPreferencesByKey($keys);

        if (count($prefs) === 0) {
            $this->throwNotFound();
        }

        foreach ($prefs as $pref) {
            $pref->delete();
        }
    }

    /**
     * @permission administrator
     *
     * @return \app\domain\SystemPreference[]
     */
    public function GetAllSystemPreferences(): array {
        return SystemPreference::findAll();
    }

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return \app\domain\SystemPreference
     */
    public function GetSystemPreference($id): SystemPreference {
        return $this->getSystemPreferenceById($id);
    }

    /**
     * @permission administrator
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
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
     * @return \app\domain\SystemPreference
     */
    public function PutSystemPreference($key, $value, $enabled, $notes): SystemPreference {
        $pref = null;

        try {
            $pref = $this->getSystemPreferenceByKey($key);
        } catch (\Exception $err) {
            $pref = new SystemPreference();
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
     * @param int             $id
     * @param string|string[] $privileges
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
     * @throws \vhs\exceptions\HttpException
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
            throw new HttpException('Invalid SystemPreference result', HttpStatusCodes::Client_Error_Not_Found);
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
     * @return bool
     */
    public function UpdateSystemPreferenceEnabled($key, $enabled): bool {
        $pref = $this->getSystemPreferenceByKey($key);

        $pref->key = $key;
        $pref->enabled = $enabled;

        return $pref->save();
    }

    /**
     * getSystemPreferenceById.
     *
     * @param int $id
     *
     * @return \app\domain\SystemPreference
     */
    private function getSystemPreferenceById($id): SystemPreference {
        /** @var SystemPreference|null */
        $pref = SystemPreference::find($id);

        if (is_null($pref)) {
            $this->throwNotFound();
        }

        return $pref;
    }

    /**
     * getSystemPreferencesByKey.
     *
     * @param string $key
     *
     * @return \app\domain\SystemPreference
     */
    private function getSystemPreferenceByKey($key): SystemPreference {
        /** @var SystemPreference[]|null */
        $prefs = SystemPreference::findByKey($key);

        if (is_null($prefs) || count($prefs) !== 1) {
            $this->throwNotFound();
        }

        return $prefs[0];
    }

    /**
     * getSystemPreferencesByKey.
     *
     * @param string ...$keys
     *
     * @return \app\domain\SystemPreference[]
     */
    private function getSystemPreferencesByKey(string ...$keys): array {
        /** @var SystemPreference[]|null */
        $prefs = SystemPreference::findByKey(...$keys);

        if (is_null($prefs) || count($prefs) === 0) {
            $this->throwNotFound();
        }

        return $prefs;
    }
}
