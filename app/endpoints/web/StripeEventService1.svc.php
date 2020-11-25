<?php

namespace app\endpoints\web;

use app\services\StripeEventService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class StripeEventService1 extends JsonEndpoint
{
    public function __construct()
    {
        parent::__construct(new StripeEventService(new ServiceContext($this)));
    }
}
