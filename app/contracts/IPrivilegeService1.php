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
     * @param mixed $filters
     *
     * @return mixed
     */
    public function CountPrivileges($filters);

    /**
     * @permission administrator
     *
     * @param string $name
     * @param string $code
     * @param string $description
     * @param string $icon
     * @param bool   $enabled
     *
     * @return mixed
     */
    public function CreatePrivilege($name, $code, $description, $icon, $enabled);

    /**
     * @permission administrator
     *
     * @param int $id
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
     * @param int $id
     *
     * @return mixed
     */
    public function GetPrivilege($id);

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return mixed
     */
    public function GetUserPrivileges($userid);

    /**
     * @permission administrator|user|grants
     *
     * @param int   $page
     * @param int   $size
     * @param mixed $columns
     * @param mixed $order
     * @param mixed $filters
     *
     * @return mixed
     */
    public function ListPrivileges($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $description
     *
     * @return mixed
     */
    public function UpdatePrivilegeDescription($id, $description);

    /**
     * @permission administrator
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return mixed
     */
    public function UpdatePrivilegeEnabled($id, $enabled);

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $icon
     *
     * @return mixed
     */
    public function UpdatePrivilegeIcon($id, $icon);

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $name
     *
     * @return mixed
     */
    public function UpdatePrivilegeName($id, $name);
}
