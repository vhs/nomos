<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 3:01 PM
 */

namespace app\endpoints\web;


use app\services\IpnService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class IpnService1 extends JsonEndpoint {
    protected function __construct() {
        parent::__construct(new IpnService(new ServiceContext($this)));
    }
}