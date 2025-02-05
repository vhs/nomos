<?php

namespace app\exceptions;

/** @typescript */
class UserAlreadyExistsException extends \Exception {
    public function __construct($message = 'User already exists') {
        parent::__construct($message);
    }
}
