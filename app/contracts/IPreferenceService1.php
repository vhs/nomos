<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/5/2016
 * Time: 10:31 AM.
 */

namespace app\contracts;

use vhs\services\IContract;

interface IPreferenceService1 extends IContract {
    /**
     * @permission administrator
     *
     * @param $key
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
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return array
     */
    public function ListSystemPreferences($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param $key
     * @param $value
     *
     * @return mixed
     */
    public function PutSystemPreference($key, $value, $enabled, $notes);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $privileges
     *
     * @return mixed
     */
    public function PutSystemPreferencePrivileges($id, $privileges);

    /**
     * @permission anonymous
     *
     * @param $key
     *
     * @return mixed
     */
    public function SystemPreference($key);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $key
     * @param $value
     *
     * @return mixed
     */
    public function UpdateSystemPreference($id, $key, $value, $enabled, $notes);

    /**
     * @permission administrator
     *
     * @param $key
     * @param $enabled
     *
     * @return mixed
     */
    public function UpdateSystemPreferenceEnabled($key, $enabled);
}
