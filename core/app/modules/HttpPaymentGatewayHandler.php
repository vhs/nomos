<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/17/2015
 * Time: 4:16 PM
 */

namespace app\modules;


use app\gateways\IPaymentGateway;
use app\gateways\PaymentGatewayException;
use vhs\web\HttpRequestHandler;
use vhs\web\HttpServer;

class HttpPaymentGatewayHandler extends HttpRequestHandler
{
    /** @var IPaymentGateway */
    private $gateway;

    public function __construct(IPaymentGateway $gateway)
    {
        $this->gateway = $gateway;
    }

    public function handle(HttpServer $server)
    {
        $server->clear();
        $server->code(200);

        $server->output($this->gateway->Process($_REQUEST));

        $server->end();
    }
}
