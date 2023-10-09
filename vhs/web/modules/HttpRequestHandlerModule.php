<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/17/2015
 * Time: 3:32 PM
 */

namespace vhs\web\modules;

use vhs\web\HttpRequestHandler;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

abstract class HttpRequestHandlerModule implements IHttpModule {
    private $registry = [];

    protected function register_internal($method, $url, HttpRequestHandler $handler) {
        if (!array_key_exists($method, $this->registry)) {
            $this->registry[$method] = [];
        }

        $this->registry[$method][$url] = $handler;
    }

    public function __construct() {
    }

    public function handle(HttpServer $server) {
        if (array_key_exists($server->request->method, $this->registry)) {
            if (array_key_exists($server->request->url, $this->registry[$server->request->method])) {
                $this->registry[$server->request->method][$server->request->url]->handle($server);
            }
        }
    }

    public function handleException(HttpServer $server, \Exception $ex) {
    }

    public function endResponse(HttpServer $server) {
    }
}
