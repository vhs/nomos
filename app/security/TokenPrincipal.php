<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 4:50 PM
 */

namespace app\security;


use vhs\security\IPrincipal;

class TokenPrincipal implements IPrincipal {
    private $id;
    private $permissions;
    private $grants;
    private $name;

    public function __construct($id, $permissions, $grants = null, $name = null) {
        $this->id = $id;
        $this->permissions = $permissions;
        $this->grants = $grants;
        $this->name = $name;
    }

    public function hasAllPermissions(...$permission) { return (count(array_diff($permission, $this->permissions)) == 0); }
    public function hasAnyPermissions(...$permission) { return (count(array_intersect($permission, $this->permissions)) > 0); }
    public function canGrantAllPermissions(...$permission) { return (in_array("*", $this->grants)) || (count(array_diff($permission, $this->grants)) == 0); }
    public function canGrantAnyPermissions(...$permission) { return (in_array("*", $this->grants)) || (count(array_intersect($permission, $this->grants)) > 0); }

    public function getIdentity() {
        return $this->id;
    }

    public function isAnon() {
        return false;
    }

    public function __toString() {
        return $this->name;
    }
}
