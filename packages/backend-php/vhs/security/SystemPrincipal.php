<?php

namespace vhs\security;

/** @typescript */
class SystemPrincipal implements IPrincipal, \JsonSerializable {
    public function __construct() {
    }

    public function canGrantAllPermissions(...$permission) {
        return true;
    }

    public function canGrantAnyPermissions(...$permission) {
        return true;
    }

    public function getIdentity() {
        return 0;
    }

    public function hasAllPermissions(...$permission) {
        return true;
    }

    public function hasAnyPermissions(...$permission) {
        return true;
    }

    public function isAnon() {
        return false;
    }

    public function jsonSerialize(): mixed {
        $data = [];
        $data['id'] = 0;
        $data['permissions'] = [];

        return $data;
    }

    public function __toString() {
        return 'user: system';
    }
}
