<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 12:21 PM.
 */

namespace vhs\web\modules;

use vhs\web\HttpServer;
use vhs\web\IHttpModule;

/** @typescript */
class HttpServerInfoModule implements IHttpModule {
    /**
     * name.
     *
     * @var string
     */
    private $name;

    /**
     * __construct.
     *
     * @param string $name
     *
     * @return void
     */
    public function __construct($name = 'Madhacks') {
        $this->name = $name;
    }

    /**
     * endResponse.
     *
     * @param \vhs\web\HttpServer $server
     *
     * @return void
     */
    public function endResponse(HttpServer $server) {
    }

    /**
     * handle.
     *
     * @param \vhs\web\HttpServer $server
     *
     * @return void
     */
    public function handle(HttpServer $server) {
        $server->header('Server: ' . $this->name);
    }

    /**
     * handleException.
     *
     * @param \vhs\web\HttpServer $server
     * @param \Exception          $ex
     *
     * @return void
     */
    public function handleException(HttpServer $server, \Exception $ex) {
    }
}
