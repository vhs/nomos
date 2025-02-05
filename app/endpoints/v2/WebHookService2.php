<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 3:02 PM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\WebHookServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class WebHookService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new WebHookServiceHandler2(new ServiceContext($this)));
    }
}
