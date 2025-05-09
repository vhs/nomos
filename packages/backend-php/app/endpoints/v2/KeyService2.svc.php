<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/03/2015
 * Time: 6:38 PM.
 */

namespace app\endpoints\v2;

use app\handlers\v2\KeyServiceHandler2;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

/** @typescript */
class KeyService2 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new KeyServiceHandler2(new ServiceContext($this)));
    }
}
