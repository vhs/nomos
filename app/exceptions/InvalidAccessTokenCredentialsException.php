<?php

namespace app\exceptions;

use vhs\security\exceptions\InvalidCredentials;

class InvalidAccessTokenCredentialsException extends InvalidCredentials {
    public function __construct() {
        parent::__construct('Invalid access token', 401);
    }
}
