<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 2:41 PM
 */

require_once("include.php");

define('DEBUG', true);
define('DB_SERVER', 'localhost');
define('DB_USER', 'vhs_membership');
define('DB_PASS', '9fab3d41c56cc07962766f4ddda708e1');
define('DB_DATABASE', 'vhs_membership');

$serverLog = new \vhs\loggers\SilentLogger();
$sqlLog = new \vhs\loggers\SilentLogger();

if(DEBUG) {
    $serverLog = new \vhs\loggers\FileLogger(dirname(__FILE__) . "\\server.log");
    $sqlLog = new \vhs\loggers\FileLogger(dirname(__FILE__) . "\\sql.log");
}

\vhs\database\Database::setLogger($serverLog);
\vhs\database\Database::setRethrow(true);

$mySqlEngine = new \vhs\database\engines\mysql\MySqlEngine(
    new \vhs\database\engines\mysql\MySqlConnectionInfo(
        DB_SERVER,
        DB_USER,
        DB_PASS,
        DB_DATABASE
    ), true
);

$mySqlEngine->setLogger($sqlLog);

\vhs\database\Database::setEngine($mySqlEngine);

\vhs\web\HttpContext::Init(new \vhs\web\HttpServer(null, $serverLog));

\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpBasicAuthModule("mmp", \app\security\Authenticate::getInstance()));
\vhs\web\HttpContext::Server()->register(new \app\security\HttpApiAuthModule(\app\security\Authenticate::getInstance()));
\vhs\web\HttpContext::Server()->register(new \vhs\web\modules\HttpJsonServiceHandlerModule("web"));

\vhs\web\HttpContext::Server()->handle();

