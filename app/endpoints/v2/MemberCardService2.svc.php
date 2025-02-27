<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/21/2015
 * Time: 12:33 PM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\MemberCardServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class MemberCardService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new MemberCardServiceHandler2(new ServiceContext($this)));
    }
}
