<?php

namespace app\exceptions;

/** @typescript */
class UserAlreadyExistsException extends \Exception {
    /**
     * __construct.
     *
     * @param string $message
     */
    public function __construct($message = 'User already exists') {
        parent::__construct($message);
    }
}
