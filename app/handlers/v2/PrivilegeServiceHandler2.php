<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 2:37 PM.
 */

namespace app\handlers\v2;

use app\contracts\v2\IPrivilegeService2;
use app\domain\Privilege;
use app\exceptions\InvalidInputException;
use app\exceptions\MemberCardException;
use vhs\domain\exceptions\DomainException;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\endpoints\Endpoint;
use vhs\services\Service;
use vhs\services\ServiceRegistry;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class PrivilegeServiceHandler2 extends Service implements IPrivilegeService2 {
    /**
     * @permission administrator|user|grants
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountPrivileges($filters): int {
        return Privilege::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param string $name
     * @param string $code
     * @param string $description
     * @param string $icon
     * @param bool   $enabled
     *
     * @throws \app\exceptions\InvalidInputException
     *
     * @return \app\domain\Privilege
     */
    public function CreatePrivilege($name, $code, $description, $icon, $enabled): Privilege {
        $privs = Privilege::findByCode($code);

        if (!empty($privs)) {
            throw new InvalidInputException('Privilege already exists with that code');
        }

        $priv = new Privilege();

        $priv->name = $name;
        $priv->code = $code;
        $priv->description = $description;
        $priv->icon = $icon;
        $priv->enabled = $enabled;

        $priv->save();

        return $priv;
    }

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return void
     */
    public function DeletePrivilege($id): void {
        /** @var \app\domain\Privilege */
        $priv = Privilege::find($id);

        $priv->delete();
    }

    /**
     * @permission administrator|user|grants
     *
     * @return \app\domain\Privilege[]
     */
    public function GetAllPrivileges(): array {
        /** @var \app\domain\Privilege[] */
        return Privilege::findAll();
    }

    /**
     * @permission administrator
     *
     * @return string[]
     */
    public function GetAllSystemPermissions(): array {
        $endpoints = ServiceRegistry::get('v2')->getAllEndpoints();

        $flatPerms = [];

        /** @var Endpoint $endpoint */
        foreach ($endpoints as $endpoint) {
            foreach ($endpoint->getAllPermissions() as $permissions) {
                foreach ($permissions as $set) {
                    array_push($flatPerms, ...$set);
                }
            }
        }

        $flatPerms = array_unique($flatPerms);

        $retval = [];

        foreach ($flatPerms as $perm) {
            array_push($retval, $perm);
        }

        return $retval;
    }

    /**
     * @permission user
     *
     * @param int $id
     *
     * @throws \vhs\domain\exceptions\DomainException
     *
     * @return \app\domain\Privilege
     */
    public function GetPrivilege($id): Privilege {
        /** @var \app\domain\Privilege */
        $privilege = Privilege::find($id);

        if (is_null($privilege)) {
            throw new DomainException(sprintf('Privilege with id [%s] not found!', $id), HttpStatusCodes::Client_Error_Not_Found->value);
        }

        return $privilege;
    }

    /**
     * @permission administrator|user|grants
     *
     * @param int $userid
     *
     * @return \app\domain\Privilege[]
     */
    public function GetUserPrivileges($userid): array {
        $privileges = [];
        $userService2 = new UserServiceHandler2($this->context);

        $user = $userService2->GetUser($userid);

        if (!is_null($user)) {
            // TODO fix typing
            /** @disregard P1006 override */
            foreach ($user->privileges->all() as $privilege) {
                array_push($privileges, $privilege);
            }

            foreach ($user->membership->privileges->all() as $privilege) {
                array_push($privileges, $privilege);
            }
        }

        return $privileges;
    }

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
    public function ListPrivileges($page, $size, $columns, $order, $filters): array {
        /** @var Privilege[] */
        return Privilege::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $description
     *
     * @return bool
     */
    public function UpdatePrivilegeDescription($id, $description): bool {
        /** @var \app\domain\Privilege */
        $priv = Privilege::find($id);

        $priv->description = $description;

        return $priv->save();
    }

    /**
     * @permission administrator
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return bool
     */
    public function UpdatePrivilegeEnabled($id, $enabled): bool {
        /** @var \app\domain\Privilege */
        $priv = Privilege::find($id);

        $priv->enabled = $enabled;

        return $priv->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $icon
     *
     * @return bool
     */
    public function UpdatePrivilegeIcon($id, $icon): bool {
        /** @var \app\domain\Privilege */
        $priv = Privilege::find($id);

        $priv->icon = $icon;

        return $priv->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $name
     *
     * @return bool
     */
    public function UpdatePrivilegeName($id, $name): bool {
        /** @var \app\domain\Privilege */
        $priv = Privilege::find($id);

        $priv->name = $name;

        return $priv->save();
    }
}
