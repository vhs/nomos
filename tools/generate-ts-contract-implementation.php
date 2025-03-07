#!/usr/bin/env php
<?php
require_once join('/', [__DIR__, '..', 'conf/config.ini.php']);
require_once join('/', [__DIR__, '..', 'app/include.php']);

use app\utils\converters\PHP2TS;

$namespace = 'app\\handlers\\v2';

if ($argc < 2) {
    die("Missing file argument\n");
}

array_shift($argv);

foreach ($argv as $service_file) {
    $serviceName = basename($service_file, '.php');
    $fqcn = sprintf('%s\\%s', $namespace, $serviceName);

    require_once $service_file;

    $serviceClass = new \ReflectionClass($fqcn);

    $contract = null;
    foreach ($serviceClass->getInterfaces() as $interface) {
        if (array_key_exists('vhs\\services\\IContract', $interface->getInterfaces())) {
            $contract = $interface;
        }
    }

    $baseInterface = PHP2TS::getBaseContractInterface($contract->getName());
    $baseService = substr($baseInterface, 1);

    printf("export default class %s implements %s {\n", $baseService, $baseInterface);

    $contractMethods = $contract->getMethods();

    foreach ($contractMethods as $k => $contractMethod) {
        if ($k > 0) {
            echo "\n";
        }

        printf(
            "%s\n    async %s(%s): BackendResult<%s> {\n        return await backendCall('/services/v2/%s.svc/%s', { %s })\n }\n",
            PHP2TS::convertDocComment($contractMethod->getDocComment()),
            $contractMethod->getName(),
            PHP2TS::generateContractMethodArgs($contractMethod),
            PHP2TS::generateContractMethodReturnType($contractMethod),
            $baseService,
            $contractMethod->getName(),
            PHP2TS::generateContractMethodParams($contractMethod)
        );
    }

    printf("}\n");
}

