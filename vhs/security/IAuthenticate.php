<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 12:37 PM.
 */

namespace vhs\security;

/** @typescript */
interface IAuthenticate {
    /**
     * @return \vhs\security\IPrincipal
     */
    public static function currentPrincipal();

    /**
     * @return bool
     */
    public static function isAuthenticated();

    /**
     * login.
     *
     * @param \vhs\security\ICredentials $credentials
     *
     * @return void
     */
    public static function login(ICredentials $credentials);

    /**
     * logout.
     *
     * @return void
     */
    public static function logout();
}
