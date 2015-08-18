<?php
/**
 * Created by PhpStorm.
 * User: Steven Smethurst
 * Date: 06/01/2015
 * Time: 12:21 PM
 */

namespace app\modules;


use app\gateways\IPaymentGateway;
use vhs\web\modules\HttpRequestHandlerModule;

class HttpPaymentGatewayHandlerModule extends HttpRequestHandlerModule
{
    public static function register(IPaymentGateway $gateway)
    {
        $path = "/services/gateways/" . $gateway->Name();
        $handler = new HttpPaymentGatewayHandler($gateway);

        self::getInstance()->register_internal("GET", $path, $handler);
        self::getInstance()->register_internal("POST", $path, $handler);
        self::getInstance()->register_internal("HEAD", $path, $handler);
        self::getInstance()->register_internal("PUT", $path, $handler);
    }

    /**
     * @return HttpPaymentGatewayHandlerModule
     */
    final public static function getInstance() {
        static $aoInstance = array();

        $class = get_called_class();

        if (!isset($aoInstance[$class]))
            $aoInstance[$class] = new $class();

        return $aoInstance[$class];
    }

    final private function __clone() { }
}
