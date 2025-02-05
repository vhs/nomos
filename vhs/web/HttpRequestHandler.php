<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/17/2015
 * Time: 3:36 PM.
 */

namespace vhs\web;

/** @typescript */
abstract class HttpRequestHandler {
    abstract public function handle(HttpServer $server);
}
