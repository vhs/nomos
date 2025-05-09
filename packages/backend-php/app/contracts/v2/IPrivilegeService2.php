<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 2:33 PM.
 */

namespace app\contracts\v2;

use app\domain\Privilege;
use vhs\services\IContract;

/** @typescript */
interface IPrivilegeService2 extends IContract {
    /**
     * @permission administrator|user|grants
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountPrivileges($filters): int;

    /**
     * @permission administrator
     *
     * @param string $name
     * @param string $code
     * @param string $description
     * @param string $icon
     * @param bool   $enabled
     *
     * @return \app\domain\Privilege
     */
    public function CreatePrivilege($name, $code, $description, $icon, $enabled): Privilege;

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return void
     */
    public function DeletePrivilege($id): void;

    /**
     * @permission administrator|user|grants
     *
     * @return \app\domain\Privilege[]
     */
    public function GetAllPrivileges(): array;

    /**
     * @permission administrator
     *
     * @return string[]
     */
    public function GetAllSystemPermissions(): array;

    /**
     * @permission user
     *
     * @param int $id
     *
     * @return \app\domain\Privilege
     */
    public function GetPrivilege($id): Privilege;

    /**
     * @permission administrator|user|grants
     *
     * @param int $userid
     *
     * @return \app\domain\Privilege[]
     */
    public function GetUserPrivileges($userid): array;

    /**
     * @permission administrator|user|grants
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\Privilege[]
     */
    public function ListPrivileges($page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $description
     *
     * @return bool
     */
    public function UpdatePrivilegeDescription($id, $description): bool;

    /**
     * @permission administrator
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return bool
     */
    public function UpdatePrivilegeEnabled($id, $enabled): bool;

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $icon
     *
     * @return bool
     */
    public function UpdatePrivilegeIcon($id, $icon): bool;

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $name
     *
     * @return bool
     */
    public function UpdatePrivilegeName($id, $name): bool;
}
