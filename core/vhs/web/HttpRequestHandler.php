<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/17/2015
 * Time: 3:36 PM
 */

namespace vhs\web;


abstract class HttpRequestHandler
{
    public abstract function handle(HttpServer $server);
}
