<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/5/2016
 * Time: 10:31 AM.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IPreferenceService1 extends IContract {
    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountSystemPreferences($filters);

    /**
     * @permission administrator
     *
     * @param mixed $key
     *
     * @return mixed
     */
    public function DeleteSystemPreference($key);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetAllSystemPreferences();

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return mixed
     */
    public function GetSystemPreference($id);

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
    public function ListSystemPreferences($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param mixed $key
     * @param mixed $value
     * @param bool  $enabled
     * @param mixed $notes
     *
     * @return mixed
     */
    public function PutSystemPreference($key, $value, $enabled, $notes);

    /**
     * @permission administrator
     *
     * @param int   $id
     * @param mixed $privileges
     *
     * @return mixed
     */
    public function PutSystemPreferencePrivileges($id, $privileges);

    /**
     * @permission anonymous
     *
     * @param mixed $key
     *
     * @return mixed
     */
    public function SystemPreference($key);

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param mixed  $key
     * @param mixed  $value
     * @param bool   $enabled
     * @param string $notes
     *
     * @return mixed
     */
    public function UpdateSystemPreference($id, $key, $value, $enabled, $notes);

    /**
     * @permission administrator
     *
     * @param mixed $key
     * @param bool  $enabled
     *
     * @return mixed
     */
    public function UpdateSystemPreferenceEnabled($key, $enabled);
}
