<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 12:46 PM
 */

namespace vhs\security;

class UserPassCredentials implements ICredentials {
    private $password;
    private $username;

    public function __construct($username, $password) {
        $this->username = $username;
        $this->password = $password;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getUsername() {
        return $this->username;
    }
}
