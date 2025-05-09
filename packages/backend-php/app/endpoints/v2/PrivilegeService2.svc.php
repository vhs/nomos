<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 2:36 PM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\PrivilegeServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class PrivilegeService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new PrivilegeServiceHandler2(new ServiceContext($this)));
    }
}
