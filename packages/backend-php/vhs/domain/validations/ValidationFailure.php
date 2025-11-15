<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:42 PM.
 */

namespace vhs\domain\validations;

/** @typescript */
class ValidationFailure {
    /**
     * message.
     *
     * @var string
     */
    private $message;

    /**
     * __construct.
     *
     * @param string $message
     *
     * @return void
     */
    public function __construct($message) {
        $this->message = $message;
    }

    /**
     * getMessage.
     *
     * @return string
     */
    public function getMessage() {
        return $this->message;
    }
}
