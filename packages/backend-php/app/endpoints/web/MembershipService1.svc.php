<?php

namespace app\endpoints\web;

use app\services\MembershipService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class MembershipService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new MembershipService(new ServiceContext($this)));
    }
}
