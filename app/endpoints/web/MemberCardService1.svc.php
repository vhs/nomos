<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/21/2015
 * Time: 12:33 PM.
 */

namespace app\endpoints\web;

use app\services\MemberCardService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class MemberCardService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new MemberCardService(new ServiceContext($this)));
    }
}
