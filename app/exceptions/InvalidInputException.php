<?php

namespace app\exceptions;

class InvalidInputException extends \Exception {
    public function __construct($message = 'Invalid input') {
        parent::__construct($message);
    }
}
