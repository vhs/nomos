<?php

namespace app\exceptions;

/** @typescript */
class MemberCardException extends \Exception {
    /**
     * __construct.
     *
     * @param string $message
     */
    public function __construct($message = 'Unexpected membercard issue') {
        parent::__construct($message);
    }
}
