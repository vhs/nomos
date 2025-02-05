<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 10:41 AM.
 */

namespace vhs\security;

/** @typescript */
class AnonPrincipal implements IPrincipal {
    public function canGrantAllPermissions(...$permission) {
        return false;
    }

    public function canGrantAnyPermissions(...$permission) {
        return false;
    }

    public function getIdentity() {
        return null;
    }

    public function hasAllPermissions(...$permission) {
        if (count($permission) == 1) {
            if ($permission[0] == 'anonymous') {
                return true;
            }
        }

        return false;
    }

    public function hasAnyPermissions(...$permission) {
        return in_array('anonymous', $permission);
    }

    public function isAnon() {
        return true;
    }

    public function __toString() {
        return 'anon';
    }
}
