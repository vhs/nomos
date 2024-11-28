<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 2:36 PM
 */

namespace app\endpoints\web;

use app\services\PrivilegeService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class PrivilegeService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new PrivilegeService(new ServiceContext($this)));
    }
}
