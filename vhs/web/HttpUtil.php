<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:16 PM.
 */

namespace vhs\web;

/** @typescript */
class HttpUtil {
    /**
     * @returns HttpRequest
     */
    public static function getCurrentRequest() {
        $req = new HttpRequest();

        $req->url = self::getRequestUrl();
        $req->method = self::getRequestMethod();
        $req->headers = self::parseRequestHeaders();

        return $req;
    }

    public static function getRequestMethod() {
        return $_SERVER['REQUEST_METHOD'];
    }

    public static function getRequestUrl() {
        return $_SERVER['SCRIPT_NAME'];
    }

    public static function parseRequestHeaders() {
        $headers = [];
        foreach ($_SERVER as $key => $value) {
            if (substr($key, 0, 5) != 'HTTP_') {
                continue;
            }
            $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
            $headers[$header] = $value;
        }

        return $headers;
    }
}
