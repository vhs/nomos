<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 7:03 PM
 */

namespace vhs\security\exceptions;

class UnauthorizedException extends \Exception {
    public function __construct($message = 'Access denied') {
        parent::__construct($message);
    }
}
