<?php

namespace app\exceptions;

class MemberCardException extends \Exception {
    public function __construct($message = 'Unexpected membercard issue') {
        parent::__construct($message);
    }
}
