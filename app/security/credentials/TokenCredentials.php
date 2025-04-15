<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 3:24 PM.
 */

namespace app\security\credentials;

use vhs\security\ICredentials;

/** @typescript */
abstract class TokenCredentials implements ICredentials {
    private string $token;

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
     * getType.
     *
     * @return string
     */
    abstract public function getType();

    /**
     * getToken.
     *
     * @return string
     */
    public function getToken() {
        return $this->token;
    }
}
