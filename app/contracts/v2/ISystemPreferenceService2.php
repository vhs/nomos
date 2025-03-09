<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/5/2016
 * Time: 10:31 AM.
 */

namespace app\contracts\v2;

use app\domain\SystemPreference;
use vhs\services\IContract;

/** @typescript */
interface ISystemPreferenceService2 extends IContract {
    /**
     * @permission administrator
     *
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountSystemPreferences($filters): int;

    /**
     * @permission administrator
     *
     * @param string $key
     *
     * @throws string
     *
     * @return void
     */
    public function DeleteSystemPreference($key): void;

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\SystemPreference[]
     */
    public function GetAllSystemPreferences(): array;

    /**
     * @permission administrator
     *
     * @param string $id
     *
     * @throws string
     *
     * @return \app\domain\SystemPreference
     */
    public function GetSystemPreference($id): SystemPreference;

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
    public function ListSystemPreferences($page, $size, $columns, $order, $filters): array;

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
    public function PutSystemPreference($key, $value, $enabled, $notes): SystemPreference;

    /**
     * @permission administrator
     *
     * @param int             $id
     * @param string|string[] $privileges
     *
     * @throws string
     *
     * @return bool
     */
    public function PutSystemPreferencePrivileges($id, $privileges): bool;

    /**
     * @permission anonymous
     *
     * @param string $key
     *
     * @throws string
     *
     * @return \app\domain\SystemPreference
     */
    public function SystemPreference($key): SystemPreference;

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
    public function UpdateSystemPreference($id, $key, $value, $enabled, $notes): bool;

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
    public function UpdateSystemPreferenceEnabled($key, $enabled): bool;
}
