<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:28 PM
 */

namespace app\endpoints\web;

use app\services\AuthService;
use vhs\services\endpoints\JsonEndpoint;
use vhs\services\ServiceContext;

class AuthService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new AuthService(new ServiceContext($this)));
    }
}
