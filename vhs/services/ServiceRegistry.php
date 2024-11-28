<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 3:40 PM
 */

namespace vhs\services;

use vhs\Logger;
use vhs\Singleton;

class ServiceRegistry extends Singleton {
    private $services = [];

    /**
     * @param string $key
     * @return ServiceHandler
     */
    final public static function get($key) {
        return ServiceRegistry::getInstance()->services[$key];
    }

    /**
     * @param Logger $logger
     * @param string $key
     * @param string $namespace
     * @param string $path
     */
    final public static function register(Logger &$logger, $key, $namespace, $path) {
        ServiceRegistry::getInstance()->services[$key] = new ServiceHandler($logger, $namespace, $path, $key . '/');
    }
}
