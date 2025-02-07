<?php

/**
 * Created by PhpStorm.
 * User: thomas
 * Date: 25/02/16
 * Time: 6:01 PM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\EmailServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class EmailService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new EmailServiceHandler2(new ServiceContext($this)));
    }
}
