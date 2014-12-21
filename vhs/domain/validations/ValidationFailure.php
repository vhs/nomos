<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:42 PM
 */

namespace vhs\domain\validations;

class ValidationFailure {
    private $message;

    function __construct($message) {
        $this->message = $message;
    }

    public function getMessage() {
        return $this->message;
    }
}
