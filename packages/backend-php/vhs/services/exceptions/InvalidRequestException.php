<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 7:04 PM.
 */

namespace vhs\services\exceptions;

use vhs\exceptions\HttpException;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class InvalidRequestException extends HttpException {
    /**
     * Construct the exception. Note: The message is NOT binary safe.
     *
     * @link https://php.net/manual/en/exception.construct.php
     *
     * @param string                         $message  [optional] The Exception message to throw
     * @param \vhs\web\enums\HttpStatusCodes $code     [optional] The Exception code
     * @param \Throwable|null                $previous [optional] The previous throwable used for the exception chaining
     */
    public function __construct(
        $message = 'Invalid Request Exception',
        HttpStatusCodes $code = HttpStatusCodes::Client_Error_Method_Not_Allowed,
        $previous = null
    ) {
        parent::__construct($message, $code, $previous);
    }
}
