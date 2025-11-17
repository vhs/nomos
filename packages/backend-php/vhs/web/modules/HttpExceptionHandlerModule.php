<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/17/2015
 * Time: 4:55 PM.
 */

namespace vhs\web\modules;

use vhs\Logger;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

/** @typescript */
class HttpExceptionHandlerModule implements IHttpModule {
    //todo do something about the levels here
    /**
     * level.
     *
     * @var mixed
     *
     * @phpstan-ignore property.onlyWritten
     */
    private $level;

    /**
     * logger.
     *
     * @var \vhs\Logger
     */
    private $logger = null;

    /**
     * __construct.
     *
     * @param mixed       $level
     * @param \vhs\Logger $logger
     *
     * @return void
     */
    public function __construct($level, Logger &$logger) {
        $this->level = $level;
        $this->logger = $logger;
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
        $this->logger->log($ex->getMessage());
        $this->logger->log($ex->getTraceAsString());

        $server->code($ex->getCode() !== 0 ? $ex->getCode() : 500);

        // @phpstan-ignore if.alwaysFalse
        if (DEBUG) {
            $server->output($ex->getMessage());
            $server->output($ex->getTraceAsString());
        } else {
            $server->output($ex->getMessage());
        }
    }
}
