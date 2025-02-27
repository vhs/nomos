<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:48 AM.
 */

namespace app\endpoints\web;

use app\services\EventService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class EventService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new EventService(new ServiceContext($this)));
    }
}
