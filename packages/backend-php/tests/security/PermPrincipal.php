<?php

namespace tests\security;

/** @typescript */
class PermPrincipal implements \vhs\security\IPrincipal {
    /**
     * perms.
     *
     * @var mixed
     */
    private $perms;

    /**
     * __construct.
     *
     * @param mixed $perms
     *
     * @return void
     */
    public function __construct(...$perms) {
        if (empty($perms)) {
            $perms = [];
        }

        $this->perms = $perms;
    }

    /**
     * canGrantAllPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function canGrantAllPermissions(...$permission) {
        // TODO: Implement canGrantAllPermissions() method.
        return false;
    }

    /**
     * canGrantAnyPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function canGrantAnyPermissions(...$permission) {
        // TODO: Implement canGrantAnyPermissions() method.
        return false;
    }

    public function getIdentity() {
        return null;
    }

    /**
     * hasAllPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function hasAllPermissions(...$permission) {
        return count(array_diff($permission, $this->perms)) == 0;
    }

    /**
     * hasAnyPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function hasAnyPermissions(...$permission) {
        return count(array_intersect($permission, $this->perms)) > 0;
    }

    public function isAnon() {
        return false;
    }

    public function __toString() {
        return 'perm';
    }
}
