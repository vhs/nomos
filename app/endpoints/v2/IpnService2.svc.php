<?php

namespace app\endpoints\v2;

use app\handlers\v2\IpnServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class IpnService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new IpnServiceHandler2(new ServiceContext($this)));
    }
}
