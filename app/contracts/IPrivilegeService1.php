<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 2:33 PM.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IPrivilegeService1 extends IContract {
    /**
     * @permission administrator|user|grants
     *
     * @param $filters
     *
     * @return mixed
     */
    public function CountPrivileges($filters);

    /**
     * @permission administrator
     *
     * @param $name
     * @param $code
     * @param $description
     * @param $icon
     * @param $enabled
     *
     * @return mixed
     */
    public function CreatePrivilege($name, $code, $description, $icon, $enabled);

    /**
     * @permission administrator
     *
     * @param $id
     *
     * @return mixed
     */
    public function DeletePrivilege($id);

    /**
     * @permission administrator|user|grants
     *
     * @return mixed
     */
    public function GetAllPrivileges();

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetAllSystemPermissions();

    /**
     * @permission user
     *
     * @param $id
     *
     * @return mixed
     */
    public function GetPrivilege($id);

    /**
     * @permission administrator|user
     *
     * @param $userid
     *
     * @return mixed
     */
    public function GetUserPrivileges($userid);

    /**
     * @permission administrator|user|grants
     *
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return mixed
     */
    public function ListPrivileges($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $description
     *
     * @return mixed
     */
    public function UpdatePrivilegeDescription($id, $description);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $enabled
     *
     * @return mixed
     */
    public function UpdatePrivilegeEnabled($id, $enabled);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $icon
     *
     * @return mixed
     */
    public function UpdatePrivilegeIcon($id, $icon);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $name
     *
     * @return mixed
     */
    public function UpdatePrivilegeName($id, $name);
}
