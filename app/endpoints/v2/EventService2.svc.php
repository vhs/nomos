<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:48 AM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\EventServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class EventService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new EventServiceHandler2(new ServiceContext($this)));
    }
}
