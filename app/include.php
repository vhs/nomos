<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 3:38 PM.
 */

require_once dirname(__FILE__) . '/../vendor/autoload.php';
require_once dirname(__FILE__) . '/../vhs/vhs.php';

define('ROOT_NAMESPACE_PATH', dirname(dirname(__FILE__)));

$sqlLog = DEBUG ? new \vhs\loggers\FileLogger(dirname(__FILE__) . '/../logs/sql.log') : new \vhs\loggers\SilentLogger();

\vhs\database\Database::setLogger($sqlLog);
\vhs\database\Database::setRethrow(true);

$mySqlEngine = new \vhs\database\engines\mysql\MySqlEngine(
    new \vhs\database\engines\mysql\MySqlConnectionInfo(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE),
    true
);

$mySqlEngine->setLogger($sqlLog);

\vhs\database\Database::setEngine($mySqlEngine);

$rabbitLog = DEBUG ? new \vhs\loggers\FileLogger(dirname(__FILE__) . '/../logs/rabbit.log') : new \vhs\loggers\SilentLogger();

\vhs\messaging\MessageQueue::setLogger($rabbitLog);
\vhs\messaging\MessageQueue::setRethrow(true);

$rabbitMQ = new \vhs\messaging\engines\RabbitMQ\RabbitMQEngine(
    new \vhs\messaging\engines\RabbitMQ\RabbitMQConnectionInfo(RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD, RABBITMQ_VHOST)
);

$rabbitMQ->setLogger($rabbitLog);

\vhs\messaging\MessageQueue::setEngine($rabbitMQ);

\vhs\SplClassLoader::getInstance()->add(new \vhs\SplClassLoaderItem('app', ROOT_NAMESPACE_PATH));

$serviceLog = DEBUG ? new \vhs\loggers\FileLogger(dirname(__FILE__) . '/service.log') : new \vhs\loggers\SilentLogger();

\vhs\services\ServiceRegistry::register($serviceLog, 'web', 'app\\endpoints\\web', ROOT_NAMESPACE_PATH);
\vhs\services\ServiceRegistry::register($serviceLog, 'native', 'app\\endpoints\\native', ROOT_NAMESPACE_PATH);
