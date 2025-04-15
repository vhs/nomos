<?php

namespace app\exceptions;

/** @typescript */
class InvalidPasswordHashException extends \Exception {
    /**
     * __construct.
     *
     * @param string $message
     */
    public function __construct($message = 'Invalid password hash') {
        parent::__construct($message);
    }
}
