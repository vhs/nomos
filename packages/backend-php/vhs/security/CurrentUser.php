<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 10:42 AM.
 */

namespace vhs\security;

/** @typescript */
class CurrentUser {
    /** @var \vhs\security\IPrincipal $currentPrincipal */
    public $currentPrincipal;

    /**
     * __construct.
     */
    protected function __construct() {
        $this->currentPrincipal = new AnonPrincipal();
    }

    /**
     * canGrantAllPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    final public static function canGrantAllPermissions(...$permission) {
        return CurrentUser::getPrincipal()->canGrantAllPermissions(...$permission);
    }

    /**
     * canGrantAnyPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    final public static function canGrantAnyPermissions(...$permission) {
        return CurrentUser::getPrincipal()->canGrantAnyPermissions(...$permission);
    }

    /**
     * getIdentity.
     *
     * @return mixed
     */
    final public static function getIdentity() {
        return CurrentUser::getPrincipal()->getIdentity();
    }

    /**
     * getPrincipal.
     *
     * @return \vhs\security\IPrincipal
     */
    final public static function getPrincipal() {
        return CurrentUser::getInstance()->currentPrincipal;
    }

    /**
     * hasAllPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    final public static function hasAllPermissions(...$permission) {
        return CurrentUser::getPrincipal()->hasAllPermissions(...$permission);
    }

    /**
     * hasAnyPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    final public static function hasAnyPermissions(...$permission) {
        return CurrentUser::getPrincipal()->hasAnyPermissions(...$permission);
    }

    /**
     * isAnon.
     *
     * @return bool
     */
    final public static function isAnon() {
        return CurrentUser::getPrincipal()->isAnon();
    }

    /**
     * setPrincipal.
     *
     * @param \vhs\security\IPrincipal $principal
     *
     * @return void
     */
    final public static function setPrincipal($principal) {
        CurrentUser::getInstance()->currentPrincipal = $principal;
    }

    /**
     * getInstance.
     *
     * @return \vhs\security\CurrentUser
     */
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

    /**
     * __clone.
     *
     * @return void
     */
    public function __clone(): void {
    }
}
