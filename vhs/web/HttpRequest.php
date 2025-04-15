<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 3:20 PM.
 */

namespace vhs\web;

/** @typescript */
class HttpRequest {
    /** @var array<string,string> */
    public $headers;

    /** @var string */
    public $method;

    /** @var string */
    public $url;

    /**
     * __construct.
     *
     * @return void
     */
    public function __construct() {}
}
