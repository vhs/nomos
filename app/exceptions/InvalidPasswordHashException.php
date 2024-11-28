<?php

namespace app\exceptions;

class InvalidPasswordHashException extends \Exception {
    public function __construct($message = 'Invalid password hash') {
        parent::__construct($message);
    }
}
