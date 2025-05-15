<?php

namespace app\endpoints\web;

use app\services\IpnService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class IpnService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new IpnService(new ServiceContext($this)));
    }
}
