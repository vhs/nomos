<?php

namespace app\exceptions;

class UserAlreadyExistsException extends \Exception {
    public function __construct($message = 'User already exists') {
        parent::__construct($message);
    }
}
