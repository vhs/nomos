<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 3:02 PM
 */

namespace app\endpoints\web;

use app\services\WebHookService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class WebHookService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new WebHookService(new ServiceContext($this)));
    }
}
