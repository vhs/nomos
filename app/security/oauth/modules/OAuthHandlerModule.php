<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/18/2015
 * Time: 11:07 AM
 */

namespace app\security\oauth\modules;

use vhs\web\modules\HttpRequestHandlerModule;

class OAuthHandlerModule extends HttpRequestHandlerModule {
    /**
     * @return OAuthHandlerModule
     */
    final public static function getInstance() {
        static $aoInstance = [];

        $class = get_called_class();

        if (!isset($aoInstance[$class])) {
            $aoInstance[$class] = new $class();
        }

        return $aoInstance[$class];
    }

    public static function register(OAuthHandler $handler) {
        $url = $handler->getUrl();

        self::getInstance()->register_internal('GET', $url, $handler);
        self::getInstance()->register_internal('POST', $url, $handler);
        self::getInstance()->register_internal('HEAD', $url, $handler);
        self::getInstance()->register_internal('PUT', $url, $handler);
    }

    private function __clone() {
    }
}
