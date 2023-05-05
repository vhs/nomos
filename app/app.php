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

\vhs\observability\OpenTelemetry::Init($serverLog);

\vhs\web\HttpContext::Init(new \vhs\web\HttpServer(new \vhs\web\modules\HttpServerInfoModule("Nomos"), $serverLog));

\vhs\web\HttpContext::Server()->register(new \app\security\HttpApiAuthModule(\app\security\Authenticate::getInstance()));
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpBearerTokenAuthModule(\app\security\Authenticate::getInstance()));
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpBasicAuthModule("Nomos", \app\security\Authenticate::getInstance()));
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpExceptionHandlerModule("verbose", $serverLog));
\vhs\web\HttpContext::Server()->register(\app\modules\HttpPaymentGatewayHandlerModule::getInstance());
\vhs\web\HttpContext::Server()->register(\app\security\oauth\modules\OAuthHandlerModule::getInstance());
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpJsonServiceHandlerModule("web"));
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpTraceLinkModule());


\app\modules\HttpPaymentGatewayHandlerModule::register(new \app\gateways\PaypalGateway());
\app\modules\HttpPaymentGatewayHandlerModule::register(new \app\gateways\PaypalGateway(), "/gateways/paypal/ipn.php");

\app\monitors\PaypalIpnMonitor::getInstance()->Init($serverLog);
\app\monitors\PaymentMonitor::getInstance()->Init($serverLog);
\app\monitors\DomainEventMonitor::getInstance()->Init($serverLog);

\app\security\oauth\modules\OAuthHandlerModule::register(new \app\security\oauth\modules\GithubOAuthHandler());
\app\security\oauth\modules\OAuthHandlerModule::register(new \app\security\oauth\modules\GoogleOAuthHandler());
\app\security\oauth\modules\OAuthHandlerModule::register(new \app\security\oauth\modules\SlackOAuthHandler());

try {
    \vhs\web\HttpContext::Server()->handle();
} catch (\vhs\RequestFinished $e) {
} finally {
    /*
     * This is here to fix a problem where exit-handlers need to finish dealing
     * with a request e.g. by sending traces to an OpenTelemetry service, and
     * that may take between a few ms and a while, which we should never make
     * the client wait for.
     *
     * https://stackoverflow.com/questions/15273570/continue-processing-php-after-sending-http-response
     */
    session_write_close();
    fastcgi_finish_request();
    // Ensure that the root span of the server is always closed cleanly.
    \vhs\web\HttpContext::Server()->endRootSpan();
    exit();
}
