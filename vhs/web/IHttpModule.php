<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 11:52 AM.
 */

namespace vhs\web;

/** @typescript */
interface IHttpModule {
    public function endResponse(HttpServer $server);

    public function handle(HttpServer $server);

    public function handleException(HttpServer $server, \Exception $ex);
}
