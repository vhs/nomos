<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/05/2016
 * Time: 2:00 PM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\SystemPreferenceServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class SystemPreferenceService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new SystemPreferenceServiceHandler2(new ServiceContext($this)));
    }
}
