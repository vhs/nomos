<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 6:21 PM.
 */

namespace app\security;

use vhs\security\IPrincipal;

/** @typescript */
class UserPrincipal implements IPrincipal, \JsonSerializable {
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
     * permissions.
     *
     * @var mixed
     */
    private $permissions;

    /**
     * username.
     *
     * @var mixed
     */
    private $username;

    /**
     * __construct.
     *
     * @param mixed $id
     * @param mixed $permissions
     * @param mixed $grants
     * @param mixed $username
     *
     * @return void
     */
    public function __construct($id, $permissions, $grants = null, $username = null) {
        $this->id = $id;
        $this->permissions = $permissions;
        $this->grants = $grants;
        $this->username = $username;
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
     * jsonSerialize.
     *
     * @return mixed
     */
    public function jsonSerialize(): mixed {
        $data = [];
        $data['id'] = $this->id;
        $data['permissions'] = $this->permissions;

        return $data;
    }

    /**
     * __toString.
     *
     * @return string
     */
    public function __toString() {
        return 'user:' . $this->username;
    }
}
