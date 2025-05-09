<?php

namespace app\exceptions;

use vhs\exceptions\HttpException;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class MemberCardException extends HttpException {
    /**
     * __construct.
     *
     * @param string $message
     * @param mixed  $code
     */
    public function __construct($message = 'Unexpected membercard issue', $code = HttpStatusCodes::Client_Error_Im_a_teapot) {
        parent::__construct($message, $code);
    }
}
