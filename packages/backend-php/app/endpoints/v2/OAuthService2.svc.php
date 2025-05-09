<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:28 PM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\OAuthServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class OAuthService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new OAuthServiceHandler2(new ServiceContext($this)));
    }
}
