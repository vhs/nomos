<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 7:03 PM.
 */

namespace vhs\security\exceptions;

use vhs\exceptions\HttpException;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class UnauthorizedException extends HttpException {
    public function __construct($message = 'Access denied') {
        parent::__construct($message, HttpStatusCodes::Client_Error_Forbidden);
    }
}
