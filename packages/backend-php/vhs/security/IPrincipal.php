<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 10:39 AM.
 */

namespace vhs\security;

/**
 * @property \vhs\security\IPrincipal $currentPrincipal
 *
 * @typescript
 */
interface IPrincipal {
    /**
     * canGrantAllPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function canGrantAllPermissions(...$permission);

    /**
     * canGrantAnyPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function canGrantAnyPermissions(...$permission);

    /**
     * getIdentity.
     *
     * @return mixed
     */
    public function getIdentity();

    /**
     * hasAllPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function hasAllPermissions(...$permission);

    /**
     * hasAnyPermissions.
     *
     * @param string ...$permission
     *
     * @return bool
     */
    public function hasAnyPermissions(...$permission);

    /**
     * isAnon.
     *
     * @return bool
     */
    public function isAnon();

    /**
     * __toString.
     *
     * @return string
     */
    public function __toString();
}
