<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 3:53 PM.
 */

namespace vhs\services;

/** @typescript */
class ServiceClient {
    public static function __callStatic($name, $arguments) {
        $uri = explode('_', $name);

        $namespace = $uri[0];
        $service = $uri[1];
        $method = $uri[2];

        $uri = '/services/' . $namespace . '/' . $service . '.svc';

        $contract = ServiceRegistry::get($namespace)->discover($uri, true);

        $data = array_combine($contract->methods->$method, $arguments);

        return ServiceRegistry::get($namespace)->handle($uri . '/' . $method, $data, true);
    }
}
