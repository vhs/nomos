<?php

namespace app\exceptions;

use vhs\security\exceptions\InvalidCredentials;

class InvalidKeyCredentialsException extends InvalidCredentials {
    public function __construct() {
        parent::__construct('Invalid key', 401);
    }
}
