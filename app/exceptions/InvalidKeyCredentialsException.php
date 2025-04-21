<?php

namespace app\exceptions;

use vhs\security\exceptions\InvalidCredentials;
use vhs\web\enums\HttpStatusCodes;

class InvalidKeyCredentialsException extends InvalidCredentials {
    /**
     * __construct.
     *
     * @return void
     */
    public function __construct() {
        parent::__construct('Invalid key', HttpStatusCodes::Client_Error_Unauthorized);
    }
}
