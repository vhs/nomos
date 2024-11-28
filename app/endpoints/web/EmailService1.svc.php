<?php

/**
 * Created by PhpStorm.
 * User: thomas
 * Date: 25/02/16
 * Time: 6:01 PM
 */

namespace app\endpoints\web;

use app\services\EmailService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class EmailService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new EmailService(new ServiceContext($this)));
    }
}
