<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 3:59 PM
 */

namespace vhs\services;


use vhs\services\endpoints\Endpoint;

class ServiceContext {

    /** @var Endpoint $endpoint */
    public $endpoint;

    public function __construct(Endpoint $endpoint) {
        $this->endpoint = $endpoint;
    }
}