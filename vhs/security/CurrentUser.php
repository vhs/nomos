<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 10:42 AM.
 */

namespace vhs\security;

use vhs\Singleton;

/** @typescript */
class CurrentUser {
    /** @var IPrincipal $currentPrincipal */
    private $currentPrincipal;

    protected function __construct() {
        $this->currentPrincipal = new AnonPrincipal();
    }

    final public static function canGrantAllPermissions(...$permission) {
        return CurrentUser::getPrincipal()->canGrantAllPermissions(...$permission);
    }

    final public static function canGrantAnyPermissions(...$permission) {
        return CurrentUser::getPrincipal()->canGrantAnyPermissions(...$permission);
    }

    final public static function getIdentity() {
        return CurrentUser::getPrincipal()->getIdentity();
    }

    /**
     * @return IPrincipal
     */
    final public static function getPrincipal() {
        return CurrentUser::getInstance()->currentPrincipal;
    }

    final public static function hasAllPermissions(...$permission) {
        return CurrentUser::getPrincipal()->hasAllPermissions(...$permission);
    }

    final public static function hasAnyPermissions(...$permission) {
        return CurrentUser::getPrincipal()->hasAnyPermissions(...$permission);
    }

    final public static function isAnon() {
        return CurrentUser::getPrincipal()->isAnon();
    }

    /**
     * @param IPrincipal $principal
     */
    final public static function setPrincipal($principal) {
        CurrentUser::getInstance()->currentPrincipal = $principal;
    }

    final protected static function getInstance() {
        static $aoInstance = [];

        if (session_status() === PHP_SESSION_ACTIVE) {
            if (!isset($_SESSION['CurrentUser'])) {
                $_SESSION['CurrentUser'] = new CurrentUser();
            }

            return $_SESSION['CurrentUser'];
        } else {
            if (!isset($aoInstance['CurrentUser'])) {
                $aoInstance['CurrentUser'] = new CurrentUser();
            }

            return $aoInstance['CurrentUser'];
        }
    }

    private function __clone() {
    }
}
