<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 12:46 PM.
 */

namespace vhs\security;

/** @typescript */
class UserPassCredentials implements ICredentials {
    /**
     * password.
     *
     * @var string
     */
    private $password;

    /**
     * username.
     *
     * @var string
     */
    private $username;

    /**
     * __construct.
     *
     * @param string $username
     * @param string $password
     *
     * @return void
     */
    public function __construct($username, $password) {
        $this->username = $username;
        $this->password = $password;
    }

    /**
     * getPassword.
     *
     * @return string
     */
    public function getPassword() {
        return $this->password;
    }

    /**
     * getUsername.
     *
     * @return string
     */
    public function getUsername() {
        return $this->username;
    }
}
