<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 6:05 PM.
 */

namespace app\endpoints\web;

use app\services\PinService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class PinService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new PinService(new ServiceContext($this)));
    }
}
