<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 12:37 PM
 */

namespace vhs\security;


interface IAuthenticate {
    public function login(ICredentials $credentials);
    public function logout();

    /**
     * @return bool
     */
    public function isAuthenticated();

    /**
     * @return IPrincipal
     */
    public function currentPrincipal();
}