<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 11:00 AM
 */

namespace tests\endpoints\web;


use tests\services\TestService;
use vhs\services\endpoints\JsonEndpoint;

class TestService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new TestService());
    }
}