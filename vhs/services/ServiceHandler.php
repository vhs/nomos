<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 29/12/2014
 * Time: 11:22 AM.
 */

namespace vhs\services;

use vhs\Logger;
use vhs\services\endpoints\Endpoint;
use vhs\services\exceptions\InvalidRequestException;
use vhs\SplClassLoader;
use vhs\SplClassLoaderItem;

/** @typescript */
class ServiceHandler {
    private $endpointNamespace;
    /** @var Logger */
    private $logger;
    private $rootNamespacePath;
    private $uriPrefixPath;

    public function __construct(Logger &$logger, $endpointNamespace, $rootNamespacePath = null, $uriPrefixPath = null) {
        $this->logger = &$logger;
        $this->endpointNamespace = $endpointNamespace;
        $this->rootNamespacePath = is_null($rootNamespacePath) ? dirname(__FILE__) : $rootNamespacePath;
        $this->uriPrefixPath = $uriPrefixPath;

        SplClassLoader::getInstance()->add(new SplClassLoaderItem($this->endpointNamespace, $this->rootNamespacePath, '.svc.php'));
    }

    public function discover($uri, $isNative = false) {
        /** @var Endpoint $endpoint */
        $endpoint = $this->getEndpoint($uri);

        $out = $endpoint::getInstance()->discover();

        if ($isNative) {
            return $endpoint::getInstance()->deserializeOutput($out);
        } else {
            return $out;
        }
    }

    /**
     * @return Endpoint[]
     */
    public function getAllEndpoints() {
        $files = scandir($this->rootNamespacePath . '/' . str_replace('\\', '/', $this->endpointNamespace));

        $endpoints = [];

        foreach ($files as $file) {
            if (preg_match('%(?P<endpoint>.*)\.svc.php%im', $file, $matches)) {
                /** @var Endpoint $endpoint */
                $endpoint = $this->endpointNamespace . '\\' . $matches['endpoint'];
                array_push($endpoints, $endpoint::getInstance());
            }
        }

        return $endpoints;
    }

    public function handle($uri, $data = null, $isNative = false) {
        /** @var Endpoint[] $endpoints */
        $endpoints = [];

        if (!preg_match('%.*/' . $this->uriPrefixPath . '(?P<endpoint>.*)\.svc/(?P<method>.*)%im', $uri, $regs)) {
            if (!preg_match('%.*/' . $this->uriPrefixPath . '(?P<endpoint>.*)\.svc%im', $uri, $regs)) {
                if (preg_match('%.*/' . $this->uriPrefixPath . 'help%im', $uri, $regs)) {
                    $files = scandir($this->rootNamespacePath . '/' . str_replace('\\', '/', $this->endpointNamespace));

                    foreach ($files as $file) {
                        if (preg_match('%(?P<endpoint>.*)\.svc.php%im', $file, $matches)) {
                            array_push($endpoints, $matches['endpoint']);
                        }
                    }
                } else {
                    throw new InvalidRequestException('Invalid service request');
                }
            }
        }

        if (count($endpoints) > 0) {
            $discovery = [];

            foreach ($endpoints as $class) {
                /** @var Endpoint $endpoint */
                $endpoint = $this->endpointNamespace . '\\' . $class;

                $discovery[$class . '.svc'] = $endpoint::getInstance()->deserializeOutput($endpoint::getInstance()->discover());
            }

            /*TODO this is a hack. Each endpoint in a namespace could have a totally different
             * type of serializer and here we're effectively assuming that returning json encoded
             * data is ok. This is probably fine in all cases but not ideal. The caller doesn't know that
             * help was requested and that the return type is going to be the result of a service discovery
             */
            return json_encode($discovery);
        } else {
            /** @var Endpoint $endpoint */
            $endpoint = $this->endpointNamespace . '\\' . $regs['endpoint'];

            if (array_key_exists('method', $regs)) {
                $args = $data;
                if ($isNative) {
                    $args = $endpoint::getInstance()->serializeInput($data);
                }

                $endpoint::getInstance()->logger = &$this->logger;

                $method = $regs['method'];
                $out = $endpoint::getInstance()->handleRequest($method, $args);
            } else {
                $out = $endpoint::getInstance()->discover();
            }

            if ($isNative) {
                return $endpoint::getInstance()->deserializeOutput($out);
            } else {
                return $out;
            }
        }
    }

    /**
     * @param $uri
     *
     * @throws InvalidRequestException
     *
     * @return Endpoint
     */
    private function getEndpoint($uri) {
        if (!preg_match('%.*/' . $this->uriPrefixPath . '(?P<endpoint>.*)\.svc%im', $uri, $regs)) {
            throw new InvalidRequestException('Invalid service request');
        }

        $endpoint = $this->endpointNamespace . '\\' . $regs['endpoint'];

        return $endpoint;
    }
}
