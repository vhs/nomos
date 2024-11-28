<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/17/2015
 * Time: 4:55 PM
 */

namespace vhs\web\modules;

use vhs\Logger;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

class HttpExceptionHandlerModule implements IHttpModule {
    //todo do something about the levels here
    private $level;
    private $logger;

    public function __construct($level, Logger &$logger) {
        $this->level = $level;
        $this->logger = $logger;
    }

    public function endResponse(HttpServer $server) {
    }

    public function handle(HttpServer $server) {
    }

    public function handleException(HttpServer $server, \Exception $ex) {
        $this->logger->log($ex->getMessage());
        $this->logger->log($ex->getTraceAsString());

        if (DEBUG) {
            $server->output($ex->getMessage());
            $server->output($ex->getTraceAsString());
        } else {
            $server->output($ex->getMessage());
        }
    }
}
