<?php

namespace app\exceptions;

/** @typescript */
class InvalidInputException extends \Exception {
    /**
     * __construct.
     *
     * @param string $message
     */
    public function __construct($message = 'Invalid input') {
        parent::__construct($message);
    }
}
