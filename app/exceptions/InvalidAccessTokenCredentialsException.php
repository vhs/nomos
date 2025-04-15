<?php

namespace app\exceptions;

use vhs\security\exceptions\InvalidCredentials;
use vhs\web\enums\HttpStatusCodes;

class InvalidAccessTokenCredentialsException extends InvalidCredentials {
    public function __construct() {
        parent::__construct('Invalid access token', HttpStatusCodes::Client_Error_Unauthorized);
    }
}
