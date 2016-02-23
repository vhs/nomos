<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 10:39 AM
 */

namespace vhs\security;


interface IPrincipal {
    public function hasAllPermissions(...$permission);
    public function hasAnyPermissions(...$permission);
    public function canGrantAllPermissions(...$permission);
    public function canGrantAnyPermissions(...$permission);
    public function getIdentity();
    public function isAnon();
    public function __toString();
}
