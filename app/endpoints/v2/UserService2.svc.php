<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 3:01 PM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\UserServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class UserService2 extends JsonEndpoint {
    protected function __construct() {
        parent::__construct(new UserServiceHandler2(new ServiceContext($this)));
    }
}
