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
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountSystemPreferences($filters): int;

    /**
     * @permission administrator
     *
     * @param string|string[] $keys
     *
     * @return void
     */
    public function DeleteSystemPreference($keys): void;

    /**
     * @permission administrator
     *
     * @return \app\domain\SystemPreference[]
     */
    public function GetAllSystemPreferences(): array;

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return \app\domain\SystemPreference
     */
    public function GetSystemPreference($id): SystemPreference;

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
    public function ListSystemPreferences($page, $size, $columns, $order, $filters): array;

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
    public function PutSystemPreference($key, $value, $enabled, $notes): SystemPreference;

    /**
     * @permission administrator
     *
     * @param int             $id
     * @param string|string[] $privileges
     *
     * @return bool
     */
    public function PutSystemPreferencePrivileges($id, $privileges): bool;

    /**
     * @permission anonymous
     *
     * @param string $key
     *
     * @throws \vhs\exceptions\HttpException
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
     * @return bool
     */
    public function UpdateSystemPreference($id, $key, $value, $enabled, $notes): bool;

    /**
     * @permission administrator
     *
     * @param string $key
     * @param bool   $enabled
     *
     * @return bool
     */
    public function UpdateSystemPreferenceEnabled($key, $enabled): bool;
}
