<?php

namespace vhs\services\exceptions;


use Throwable;

class InvalidInputException extends \Exception {
    public function __construct($message = "", $code = 400, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
