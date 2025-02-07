<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 6:05 PM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\PinServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class PinService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new PinServiceHandler2(new ServiceContext($this)));
    }
}
