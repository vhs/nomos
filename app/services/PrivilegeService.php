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
use vhs\services\endpoints\Endpoint;
use vhs\services\Service;
use vhs\services\ServiceRegistry;

class PrivilegeService extends Service implements IPrivilegeService1 {

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetAllSystemPermissions() {
        $endpoints = ServiceRegistry::get("web")->getAllEndpoints();

        $flatPerms = array();

        /** @var Endpoint $endpoint */
        foreach($endpoints as $endpoint) {
            foreach($endpoint->getAllPermissions() as $permissions) {
                foreach($permissions as $set) {
                    array_push($flatPerms, ...$set);
                }
            }
        }

        $flatPerms = array_unique($flatPerms);

        $retval = array();

        foreach($flatPerms as $perm)
            array_push($retval, $perm);

        return $retval;
    }

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetAllPrivileges() {
        return Privilege::findAll();
    }

    /**
     * @permission administrator|user
     * @param $userid
     * @return mixed
     */
    public function GetUserPrivileges($userid) {
        $privileges = array();
        $userService = new UserService($this->context);

        $user = $userService->GetUser($userid);

        if(!is_null($user)) {
            foreach($user->privileges->all() as $privilege) {
                array_push($privileges, $privilege);
            }

            foreach($user->membership->privileges->all() as $privilege) {
                array_push($privileges, $privilege);
            }
        }

        return $privileges;
    }
}