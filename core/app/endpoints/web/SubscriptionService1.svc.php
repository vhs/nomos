<?php

namespace app\endpoints\web;


use app\services\SubscriptionService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class SubscriptionService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new SubscriptionService(new ServiceContext($this)));
    }
}
