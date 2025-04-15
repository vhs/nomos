<?php

namespace app\exceptions;

use vhs\security\exceptions\InvalidCredentials;

class InvalidKeyCredentialsException extends InvalidCredentials {
    /**
     * __construct.
     *
     * @return void
     */
    public function __construct() {
        parent::__construct('Invalid key');
    }
}
