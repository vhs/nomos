<?php

namespace app\endpoints\web;

use app\services\PaymentService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class PaymentService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new PaymentService(new ServiceContext($this)));
    }
}
