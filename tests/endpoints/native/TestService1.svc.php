<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 2:37 PM
 */

namespace tests\endpoints\native;

use tests\services\TestService;
use vhs\services\endpoints\NativeEndpoint;
use vhs\services\ServiceContext;

class TestService1 extends NativeEndpoint {
    public function __construct() {
        parent::__construct(new TestService(new ServiceContext($this)));
    }
}
