<?php

namespace app\exceptions;

use vhs\exceptions\HttpException;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class UserAlreadyExistsException extends HttpException {
    /**
     * __construct.
     *
     * @param string $message
     */
    public function __construct($message = 'User already exists') {
        parent::__construct($message, HttpStatusCodes::Client_Error_Failed_Dependency);
    }
}
