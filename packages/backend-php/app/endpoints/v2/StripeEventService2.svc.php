<?php

namespace app\endpoints\v2;

use app\handlers\v2\StripeEventServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class StripeEventService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new StripeEventServiceHandler2(new ServiceContext($this)));
    }
}
