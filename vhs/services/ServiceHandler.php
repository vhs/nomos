<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 29/12/2014
 * Time: 11:22 AM
 */

namespace vhs\services;



use vhs\services\exceptions\InvalidRequestException;
use vhs\SplClassLoader;
use vhs\SplClassLoaderItem;

class ServiceHandler {

    private $endpointNamespace;
    private $rootNamespacePath;
    private $uriPrefixPath;

    public function __construct($endpointNamespace, $rootNamespacePath = null, $uriPrefixPath = null) {
        $this->endpointNamespace = $endpointNamespace;
        $this->rootNamespacePath = (is_null($rootNamespacePath)) ? dirname(__FILE__) : $rootNamespacePath;
        $this->uriPrefixPath = $uriPrefixPath;

        SplClassLoader::getInstance()->add(new SplClassLoaderItem($this->endpointNamespace, $this->rootNamespacePath, '.svc.php'));
    }

    public function handle($uri, $data = null, $isNative = false) {
        if (!preg_match('%.*/'.$this->uriPrefixPath.'(?P<endpoint>.*)\.svc/(?P<method>.*)%im', $uri, $regs)) {
            if(!preg_match('%.*/'.$this->uriPrefixPath.'(?P<endpoint>.*)\.svc%im', $uri, $regs)) {
                throw new InvalidRequestException("Invalid service request");
            }
        }

        $endpoint = $this->endpointNamespace . '\\' . $regs['endpoint'];

        if(array_key_exists("method", $regs)) {
            $args = $data;
            if($isNative) $args = $endpoint::getInstance()->serializeInput($data);

            $method = $regs['method'];
            $out = $endpoint::getInstance()->handleRequest($method, $args);
        } else {
            $out = $endpoint::getInstance()->discover();
        }

        if($isNative)
            return $endpoint::getInstance()->deserializeOutput($out);
        else
            return $out;
    }

    private function getEndpoint($uri) {
        if(!preg_match('%.*/'.$this->uriPrefixPath.'(?P<endpoint>.*)\.svc%im', $uri, $regs)) {
            throw new InvalidRequestException("Invalid service request");
        }

        $endpoint = $this->endpointNamespace . '\\' . $regs['endpoint'];

        return $endpoint;
    }

    public function discover($uri, $isNative = false) {
        $endpoint = $this->getEndpoint($uri);

        $out = $endpoint::getInstance()->discover();

        if($isNative)
            return $endpoint::getInstance()->deserializeOutput($out);
        else
            return $out;
    }
}