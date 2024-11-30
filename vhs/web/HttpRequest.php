<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 3:20 PM.
 */

namespace vhs\web;

class HttpRequest {
    /** @var array */
    public $headers;

    /** @var string */
    public $method;

    /** @var string */
    public $url;

    public function __construct() {
    }
}
