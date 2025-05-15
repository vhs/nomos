<?php

namespace app\endpoints\web;

use app\services\MetricService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class MetricService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new MetricService(new ServiceContext($this)));
    }
}
