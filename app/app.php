<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 2:41 PM
 */

require_once("../conf/config.ini.php");

//Debug defined in /conf/config.ini.php
if (DEBUG) {
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
}

require_once("include.php");

$serverLog = new \vhs\loggers\FileLogger(dirname(__FILE__) . "/../logs/server.log");

\vhs\web\HttpContext::Init(new \vhs\web\HttpServer(new \vhs\web\modules\HttpServerInfoModule("Nomos"), $serverLog));

\vhs\web\HttpContext::Server()->register(new \app\security\HttpApiAuthModule(\app\security\Authenticate::getInstance()));
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpBearerTokenAuthModule(\app\security\Authenticate::getInstance()));
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpBasicAuthModule("Nomos", \app\security\Authenticate::getInstance()));
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpExceptionHandlerModule("verbose", $serverLog));
\vhs\web\HttpContext::Server()->register(\app\modules\HttpPaymentGatewayHandlerModule::getInstance());
\vhs\web\HttpContext::Server()->register(\app\security\oauth\modules\OAuthHandlerModule::getInstance());
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpJsonServiceHandlerModule("web"));


\app\modules\HttpPaymentGatewayHandlerModule::register(new \app\gateways\PaypalGateway());
\app\modules\HttpPaymentGatewayHandlerModule::register(new \app\gateways\PaypalGateway(), "/gateways/paypal/ipn.php");
\app\modules\HttpPaymentGatewayHandlerModule::register(new \app\gateways\StripeGateway());

\app\monitors\PaypalIpnMonitor::getInstance()->Init($serverLog);
\app\monitors\StripeEventMonitor::getInstance()->Init($serverLog);
\app\monitors\PaymentMonitor::getInstance()->Init($serverLog);
\app\monitors\DomainEventMonitor::getInstance()->Init($serverLog);

\app\security\oauth\modules\OAuthHandlerModule::register(new \app\security\oauth\modules\GithubOAuthHandler());
\app\security\oauth\modules\OAuthHandlerModule::register(new \app\security\oauth\modules\GoogleOAuthHandler());
\app\security\oauth\modules\OAuthHandlerModule::register(new \app\security\oauth\modules\SlackOAuthHandler());

\vhs\web\HttpContext::Server()->handle();
