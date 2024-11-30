<?php

/**
 * Created by PhpStorm.
 * User: Steven Smethurst
 * Date: 06/01/2015
 * Time: 12:21 PM.
 */

namespace app\modules;

use app\gateways\IPaymentGateway;
use vhs\web\modules\HttpRequestHandlerModule;

class HttpPaymentGatewayHandlerModule extends HttpRequestHandlerModule {
    /**
     * @return HttpPaymentGatewayHandlerModule
     */
    final public static function getInstance() {
        static $aoInstance = [];

        $class = get_called_class();

        if (!isset($aoInstance[$class])) {
            $aoInstance[$class] = new $class();
        }

        return $aoInstance[$class];
    }

    public static function register(IPaymentGateway $gateway, $url = null) {
        $path = '/services/gateways/' . $gateway->Name();
        if (!is_null($url)) {
            $path = $url;
        }

        $handler = new HttpPaymentGatewayHandler($gateway);

        self::getInstance()->register_internal('GET', $path, $handler);
        self::getInstance()->register_internal('POST', $path, $handler);
        self::getInstance()->register_internal('HEAD', $path, $handler);
        self::getInstance()->register_internal('PUT', $path, $handler);
    }

    private function __clone() {
    }
}
