<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/03/2015
 * Time: 6:38 PM.
 */

namespace app\endpoints\web;

use app\services\KeyService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class KeyService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new KeyService(new ServiceContext($this)));
    }
}
