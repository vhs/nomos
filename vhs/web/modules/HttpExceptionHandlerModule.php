<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/17/2015
 * Time: 4:55 PM
 */

namespace vhs\web\modules;


use vhs\web\HttpServer;
use vhs\web\IHttpModule;

class HttpExceptionHandlerModule implements IHttpModule
{
    //todo do something about the levels here
    private $level;

    public function __constructor($level)
    {
        $this->level = $level;
    }

    public function handle(HttpServer $server) { }

    public function endResponse(HttpServer $server) { }

    public function handleException(HttpServer $server, \Exception $ex)
    {
        if (DEBUG) {
            $server->output($ex->getMessage());
            $server->output($ex->getTraceAsString());
        }
    }
}
