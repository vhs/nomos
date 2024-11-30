<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 12:37 PM.
 */

namespace vhs\security;

interface IAuthenticate {
    /**
     * @return IPrincipal
     */
    public static function currentPrincipal();

    /**
     * @return bool
     */
    public static function isAuthenticated();

    public static function login(ICredentials $credentials);

    public static function logout();
}
