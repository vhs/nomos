<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 6:21 PM
 */

namespace app\security;


use vhs\security\IPrincipal;

class UserPrincipal implements IPrincipal, \JsonSerializable {

    private $id;
    private $permissions;
    private $grants;
    private $username;

    public function __construct($id, $permissions, $grants = null, $username = null) {
        $this->id = $id;
        $this->permissions = $permissions;
        $this->grants = $grants;
        $this->username = $username;
    }

    public function hasAllPermissions(...$permission) { return (count(array_diff($permission, $this->permissions)) == 0); }
    public function hasAnyPermissions(...$permission) { return (count(array_intersect($permission, $this->permissions)) > 0); }
    public function canGrantAllPermissions(...$permission) { return (in_array("*", $this->grants)) || (count(array_diff($permission, $this->grants)) == 0); }
    public function canGrantAnyPermissions(...$permission) { return (in_array("*", $this->grants)) || (count(array_intersect($permission, $this->grants)) > 0); }
    public function getIdentity() { return $this->id; }
    public function isAnon() { return false; }

    public function jsonSerialize() {
        $data = array();
        $data['id'] = $this->id;
        $data['permissions'] = $this->permissions;

        return $data;
    }

    public function __toString() {
        return "user:" . $this->username;
    }
}
