<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:03 PM.
 */

namespace vhs\security\exceptions;

use vhs\exceptions\HttpException;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class InvalidCredentials extends HttpException {
    public function __construct($message = 'Access denied') {
        parent::__construct($message, HttpStatusCodes::Client_Error_Forbidden);
    }
}
