<?php

namespace app\exceptions;

use vhs\exceptions\HttpException;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class InvalidPasswordHashException extends HttpException {
    /**
     * __construct.
     *
     * @param string $message
     */
    public function __construct($message = 'Invalid password hash') {
        parent::__construct($message, HttpStatusCodes::Client_Error_Unauthorized);
    }
}
