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
    /**
     * endResponse.
     *
     * @param \vhs\web\HttpServer $server
     *
     * @return void
     */
    public function endResponse(HttpServer $server);

    /**
     * handle.
     *
     * @param \vhs\web\HttpServer $server
     *
     * @return void
     */
    public function handle(HttpServer $server);

    /**
     * handleException.
     *
     * @param \vhs\web\HttpServer $server
     * @param \Exception          $ex
     *
     * @return void
     */
    public function handleException(HttpServer $server, \Exception $ex);
}
