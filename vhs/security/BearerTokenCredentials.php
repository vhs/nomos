<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/6/2016
 * Time: 1:31 PM.
 */

namespace vhs\security;

/** @typescript */
class BearerTokenCredentials implements ICredentials {
    /**
     * token.
     *
     * @var string
     */
    private $token;

    /**
     * __construct.
     *
     * @param string $token
     *
     * @return void
     */
    public function __construct($token) {
        $this->token = $token;
    }

    /**
     * getToken.
     *
     * @return string
     */
    public function getToken() {
        return $this->token;
    }
}
