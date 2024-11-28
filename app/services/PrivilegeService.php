<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 2:37 PM
 */

namespace app\services;

use app\contracts\IPrivilegeService1;
use app\domain\Privilege;
use app\exceptions\InvalidInputException;
use app\exceptions\MemberCardException;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\endpoints\Endpoint;
use vhs\services\Service;
use vhs\services\ServiceRegistry;

class PrivilegeService extends Service implements IPrivilegeService1 {
    /**
     * @permission administrator
     * @param $name
     * @param $code
     * @param $description
     * @param $icon
     * @param $enabled
     * @return mixed
     */
    public function CreatePrivilege($name, $code, $description, $icon, $enabled) {
        $privs = Privilege::findByCode($code);

        if (count($privs) != 0) {
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
     * @param $id
     * @return mixed
     */
    public function DeletePrivilege($id) {
        $priv = Privilege::find($id);

        $priv->delete();
    }

    /**
     * @permission administrator|user|grants
     * @return mixed
     */
    public function GetAllPrivileges() {
        return Privilege::findAll();
    }

    /**
     * @permission administrator
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
     * @param $id
     * @return mixed
     */
    public function GetPrivilege($id) {
        return Privilege::find($id);
    }

    /**
     * @permission administrator|user
     * @param $userid
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
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListPrivileges($page, $size, $columns, $order, $filters) {
        return Privilege::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     * @param $id
     * @param $description
     * @return mixed
     */
    public function UpdatePrivilegeDescription($id, $description) {
        $priv = Privilege::find($id);

        $priv->description = $description;

        $priv->save();
    }

    /**
     * @permission administrator
     * @param $id
     * @param $enabled
     * @return mixed
     */
    public function UpdatePrivilegeEnabled($id, $enabled) {
        $priv = Privilege::find($id);

        $priv->enabled = $enabled;

        $priv->save();
    }

    /**
     * @permission administrator
     * @param $id
     * @param $icon
     * @return mixed
     */
    public function UpdatePrivilegeIcon($id, $icon) {
        $priv = Privilege::find($id);

        $priv->icon = $icon;

        $priv->save();
    }

    /**
     * @permission administrator
     * @param $id
     * @param $name
     * @return mixed
     */
    public function UpdatePrivilegeName($id, $name) {
        $priv = Privilege::find($id);

        $priv->name = $name;

        $priv->save();
    }
}
