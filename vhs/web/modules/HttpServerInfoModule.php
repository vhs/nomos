<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 12:21 PM
 */

namespace vhs\web\modules;


use vhs\web\HttpServer;
use vhs\web\IHttpModule;

class HttpServerInfoModule implements IHttpModule {

    public function handle(HttpServer $server) {
        $server->header("Server: Madhacks");
    }

    public function handleException(HttpServer $server, \Exception $ex) {}

    public function endResponse(HttpServer $server) { }
}