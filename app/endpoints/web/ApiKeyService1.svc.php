<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 6:04 PM
 */

namespace app\endpoints\web;


use app\services\ApiKeyService;
use vhs\services\endpoints\JsonEndpoint;

class ApiKeyService1 extends JsonEndpoint {
    public function __construct() {
        parent::__construct(new ApiKeyService());
    }
}