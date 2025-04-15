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
use vhs\domain\exceptions\DomainException;
use vhs\exceptions\HttpException;
use vhs\security\CurrentUser;
use vhs\services\Service;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class PreferenceServiceHandler2 extends Service implements IPreferenceService2 {
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
     * @param string $key
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
     * @throws \vhs\domain\exceptions\DomainException
     *
     * @return \app\domain\SystemPreference
     */
    public function GetSystemPreference($id): SystemPreference {
        /** @var SystemPreference|null */
        $systemPreference = SystemPreference::find($id);

        if (is_null($systemPreference)) {
            throw new DomainException(sprintf('SystemPreference with id [%s] not found!', $id));
        }

        return $systemPreference;
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
        /** @var SystemPreference[] */
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
     * @param int             $id
     * @param string|string[] $privileges
     *
     * @return bool
     */
    public function PutSystemPreferencePrivileges($id, $privileges): bool {
        /** @var \app\domain\SystemPreference */
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
     * @param int    $id
     * @param string $key
     * @param string $value
     * @param bool   $enabled
     * @param string $notes
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return bool
     */
    public function UpdateSystemPreference($id, $key, $value, $enabled, $notes): bool {
        /** @var \app\domain\SystemPreference */
        $pref = SystemPreference::find($id);

        if (is_null($pref)) {
            throw new HttpException('SystemPreference not found', HttpStatusCodes::Client_Error_Not_Found);
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
     * @throws \vhs\exceptions\HttpException
     *
     * @return bool
     */
    public function UpdateSystemPreferenceEnabled($key, $enabled): bool {
        /** @var \app\domain\SystemPreference[] */
        $prefs = SystemPreference::findByKey($key);

        $pref = null;

        if (count($prefs) != 1) {
            throw new HttpException('SystemPreference not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        $pref = $prefs[0];

        $pref->key = $key;
        $pref->enabled = $enabled;

        return $pref->save();
    }
}
