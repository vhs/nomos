<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 4:50 PM.
 */

namespace app\security;

use vhs\security\IPrincipal;

/** @typescript */
class TokenPrincipal implements IPrincipal {
    /**
     * grants.
     *
     * @var mixed
     */
    private $grants;
    /**
     * id.
     *
     * @var mixed
     */
    private $id;
    /**
     * name.
     *
     * @var mixed
     */
    private $name;
    /**
     * permissions.
     *
     * @var mixed
     */
    private $permissions;

    /**
     * __construct.
     *
     * @param mixed $id
     * @param mixed $permissions
     * @param mixed $grants
     * @param mixed $name
     *
     * @return void
     */
    public function __construct($id, $permissions, $grants = null, $name = null) {
        $this->id = $id;
        $this->permissions = $permissions;
        $this->grants = $grants;
        $this->name = $name;
    }

    /**
     * canGrantAllPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function canGrantAllPermissions(...$permission) {
        return in_array('*', $this->grants) || count(array_diff($permission, $this->grants)) == 0;
    }

    /**
     * canGrantAnyPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function canGrantAnyPermissions(...$permission) {
        return in_array('*', $this->grants) || count(array_intersect($permission, $this->grants)) > 0;
    }

    /**
     * getIdentity.
     *
     * @return mixed
     */
    public function getIdentity() {
        return $this->id;
    }

    /**
     * hasAllPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function hasAllPermissions(...$permission) {
        return count(array_diff($permission, $this->permissions)) == 0;
    }

    /**
     * hasAnyPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function hasAnyPermissions(...$permission) {
        return count(array_intersect($permission, $this->permissions)) > 0;
    }

    /**
     * isAnon.
     *
     * @return bool
     */
    public function isAnon() {
        return false;
    }

    /**
     * __toString.
     *
     * @return string
     */
    public function __toString() {
        return $this->name;
    }
}
