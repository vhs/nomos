<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 2:37 PM.
 */

namespace app\services;

use app\contracts\IPrivilegeService1;
use app\domain\Privilege;
use app\exceptions\InvalidInputException;
use vhs\services\endpoints\Endpoint;
use vhs\services\Service;
use vhs\services\ServiceRegistry;

class PrivilegeService extends Service implements IPrivilegeService1 {
    /**
     * @permission administrator|user|grants
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function CountPrivileges($filters) {
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
     * @return mixed
     */
    public function CreatePrivilege($name, $code, $description, $icon, $enabled) {
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
    public function DeletePrivilege($id) {
        $priv = Privilege::find($id);

        $priv->delete();
    }

    /**
     * @permission administrator|user|grants
     *
     * @return \app\domain\Privilege[]
     */
    public function GetAllPrivileges() {
        /** @var \app\domain\Privilege[] */
        return Privilege::findAll();
    }

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetAllSystemPermissions() {
        $endpoints = ServiceRegistry::get('web')->getAllEndpoints();

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
     * @return \app\domain\Privilege
     */
    public function GetPrivilege($id) {
        /** @var \app\domain\Privilege */
        return Privilege::find($id);
    }

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return mixed
     */
    public function GetUserPrivileges($userid) {
        $privileges = [];
        $userService = new UserService($this->context);

        $user = $userService->GetUser($userid);

        if (!is_null($user)) {
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
     * @param int                            $page
     * @param int                            $size
     * @param string                         $columns
     * @param string                         $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function ListPrivileges($page, $size, $columns, $order, $filters) {
        return Privilege::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $description
     *
     * @return mixed
     */
    public function UpdatePrivilegeDescription($id, $description) {
        /** @var \app\domain\Privilege */
        $priv = Privilege::find($id);

        $priv->description = $description;

        $priv->save();
    }

    /**
     * @permission administrator
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return mixed
     */
    public function UpdatePrivilegeEnabled($id, $enabled) {
        /** @var \app\domain\Privilege */
        $priv = Privilege::find($id);

        $priv->enabled = $enabled;

        $priv->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $icon
     *
     * @return mixed
     */
    public function UpdatePrivilegeIcon($id, $icon) {
        /** @var \app\domain\Privilege */
        $priv = Privilege::find($id);

        $priv->icon = $icon;

        $priv->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $name
     *
     * @return mixed
     */
    public function UpdatePrivilegeName($id, $name) {
        /** @var \app\domain\Privilege */
        $priv = Privilege::find($id);

        $priv->name = $name;

        $priv->save();
    }
}
