<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 2:41 PM
 */

//Debug defined in /conf/config.ini.php
if (DEBUG) {
    error_reporting(E_ALL);
    ini_set("display_errors", 1); 
}


require_once("../conf/config.ini.php");
require_once("include.php");

$serverLog = (DEBUG) ? new \vhs\loggers\FileLogger(dirname(__FILE__) . "/server.log") : new \vhs\loggers\SilentLogger();

\vhs\web\HttpContext::Init(new \vhs\web\HttpServer(new \vhs\web\modules\HttpServerInfoModule("Nomos"), $serverLog));

\vhs\web\HttpContext::Server()->register(new \app\security\HttpApiAuthModule(\app\security\Authenticate::getInstance()));
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpBasicAuthModule("mmp", \app\security\Authenticate::getInstance()));
\vhs\web\HttpContext::Server()->register(\app\modules\HttpPaymentGatewayHandlerModule::getInstance());
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpExceptionHandlerModule("verbose"));
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpJsonServiceHandlerModule("web"));


\app\modules\HttpPaymentGatewayHandlerModule::register(new \app\gateways\PaypalGateway());

\app\monitors\PaypalIpnMonitor::getInstance()->Init($serverLog);

\vhs\web\HttpContext::Server()->handle();
