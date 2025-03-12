<?php

namespace vhs\exceptions;

use vhs\web\enums\HttpStatusCodes;

/**
 * HTTP Exception class
 *
 * @typescript
 */
class HttpException extends \Exception {
    /**
     * Construct the exception. Note: The message is NOT binary safe.
     *
     * @link https://php.net/manual/en/exception.construct.php
     *
     * @param string                         $message  [optional] The Exception message to throw
     * @param \vhs\web\enums\HttpStatusCodes $code     [optional] The Exception code
     * @param \Throwable|null                 $previous [optional] The previous throwable used for the exception chaining
     */
    public function __construct($message = '', $code = HttpStatusCodes::Server_Error_Bad_Gateway, $previous = null) {
        parent::__construct($message, $code->value, $previous);
    }
}
