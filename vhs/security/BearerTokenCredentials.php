<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/6/2016
 * Time: 1:31 PM
 */

namespace vhs\security;

class BearerTokenCredentials implements ICredentials {
    private $token;

    public function __construct($token) {
        $this->token = $token;
    }

    public function getToken() {
        return $this->token;
    }
}
