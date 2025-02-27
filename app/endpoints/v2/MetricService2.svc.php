<?php

namespace app\endpoints\v2;

use app\handlers\v2\MetricServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class MetricService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new MetricServiceHandler2(new ServiceContext($this)));
    }
}
