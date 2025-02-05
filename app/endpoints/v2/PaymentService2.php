<?php

namespace app\endpoints\v2;

use app\handlers\v2\PaymentServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class PaymentService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new PaymentServiceHandler2(new ServiceContext($this)));
    }
}
