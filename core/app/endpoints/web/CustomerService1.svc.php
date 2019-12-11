<?php

namespace app\endpoints\web;


use app\services\CustomerService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class CustomerService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new CustomerService(new ServiceContext($this)));
    }
}
