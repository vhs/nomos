<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/17/2015
 * Time: 3:32 PM.
 */

namespace vhs\web\modules;

use vhs\web\HttpRequestHandler;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

/** @typescript */
abstract class HttpRequestHandlerModule implements IHttpModule {
    /**
     * registry.
     *
     * @var array<string,array<string,\vhs\web\HttpRequestHandler>>
     */
    private $registry = [];

    /**
     * __construct.
     *
     * @return void
     */
    public function __construct() {}

    /**
     * endResponse.
     *
     * @param \vhs\web\HttpServer $server
     *
     * @return void
     */
    public function endResponse(HttpServer $server) {}

    /**
     * handle.
     *
     * @param \vhs\web\HttpServer $server
     *
     * @return void
     */
    public function handle(HttpServer $server) {
        if (array_key_exists($server->request->method, $this->registry)) {
            if (array_key_exists($server->request->url, $this->registry[$server->request->method])) {
                $this->registry[$server->request->method][$server->request->url]->handle($server);
            }
        }
    }

    /**
     * handleException.
     *
     * @param \vhs\web\HttpServer $server
     * @param \Exception          $ex
     *
     * @return void
     */
    public function handleException(HttpServer $server, \Exception $ex) {}

    /**
     * register_internal.
     *
     * @param string                      $method
     * @param string                      $url
     * @param \vhs\web\HttpRequestHandler $handler
     *
     * @return void
     */
    protected function register_internal($method, $url, HttpRequestHandler $handler) {
        if (!array_key_exists($method, $this->registry)) {
            $this->registry[$method] = [];
        }

        $this->registry[$method][$url] = $handler;
    }
}
