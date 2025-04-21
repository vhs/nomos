<?php

namespace app\exceptions;

use vhs\exceptions\HttpException;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class InvalidInputException extends HttpException {
    /**
     * __construct.
     *
     * @param string $message
     */
    public function __construct($message = 'Invalid input', $code = HttpStatusCodes::Client_Error_Bad_Request) {
        parent::__construct($message, $code);
    }
}
