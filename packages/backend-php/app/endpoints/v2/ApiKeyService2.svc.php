<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 6:04 PM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\ApiKeyServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class ApiKeyService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new ApiKeyServiceHandler2(new ServiceContext($this)));
    }
}
