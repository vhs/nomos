<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 3:04 PM.
 */

namespace vhs\web;

use vhs\Singleton;

class HttpContext extends Singleton {
    private static $server;

    public static function Init(HttpServer $server) {
        HttpContext::$server = $server;
    }

    /**
     * @return HttpServer
     *
     * @throws \Exception
     */
    public static function Server() {
        if (!isset(HttpContext::$server)) {
            throw new \Exception('Missing server in context');
        }

        return HttpContext::$server;
    }
}
