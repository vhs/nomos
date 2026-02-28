<?php

namespace app\endpoints\v2;

use app\handlers\v2\MembershipServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class MembershipService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new MembershipServiceHandler2(new ServiceContext($this)));
    }
}
