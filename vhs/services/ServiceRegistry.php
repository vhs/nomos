<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 3:40 PM
 */

namespace vhs\services;


use vhs\Singleton;

class ServiceRegistry extends Singleton {

    private $services = array();

    /**
     * @param $key string
     * @return ServiceHandler
     */
    final public static function get($key) {
        return ServiceRegistry::getInstance()->services[$key];
    }

    /**
     * @param $key string
     * @param $namespace string
     * @param $path string
     */
    final public static function register($key, $namespace, $path) {
        ServiceRegistry::getInstance()->services[$key] = new ServiceHandler($namespace, $path, $key . "/");
    }
}