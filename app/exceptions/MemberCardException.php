<?php

namespace app\exceptions;

/** @typescript */
class MemberCardException extends \Exception {
    public function __construct($message = 'Unexpected membercard issue') {
        parent::__construct($message);
    }
}
