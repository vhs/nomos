<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:28 PM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\AuthServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class AuthService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new AuthServiceHandler2(new ServiceContext($this)));
    }
}
