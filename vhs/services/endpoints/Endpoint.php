<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 3:03 PM
 */

namespace vhs\services\endpoints;


use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\exceptions\InvalidContractException;
use vhs\services\exceptions\InvalidRequestException;
use vhs\services\IContract;

abstract class Endpoint implements IEndpoint {

    protected $internal_service;

    protected function __construct(IContract $service) {
        $this->internal_service = $service;
    }

    final public static function getInstance() {
        static $aoInstance = array();

        $class = get_called_class();

        if (!isset($aoInstance[$class]))
            $aoInstance[$class] = new $class();

        return $aoInstance[$class];
    }

    final private function __clone() { }

    /**
     * @return \ReflectionClass
     * @throws \Exception
     */
    final private function getContract() {
        //TODO this would be a good place to implement a memcache registry of permissions & service endpoints
        $serviceClass = new \ReflectionClass($this->internal_service);

        $contract = null;
        foreach($serviceClass->getInterfaces() as $interface) {
            if(array_key_exists("vhs\\services\\IContract", $interface->getInterfaces()))
                $contract = $interface;
        }

        if($contract == null)
            throw new InvalidContractException("Invalid service contract");

        return $contract;
    }

    final public function getAllPermissions() {
        $contract = $this->getContract();

        $allPermissions = array();

        foreach($contract->getMethods() as $method) {
            $allPermissions[$method->getName()] = $this->getMethodPermissions($method);
        }

        return $allPermissions;
    }

    final private function getMethodPermissions(\ReflectionMethod $method) {
        $comments = $method->getDocComment();

        $permissions = array();

        if (preg_match_all('%^\s*\*\s*@permission\s+(?P<permission>(?:[a-z0-9-]+\|?)+)\s*$%im', $comments, $result, PREG_PATTERN_ORDER)) {

            foreach ($result[1] as $perm) {
                $arr = explode('|', $perm);

                array_push($permissions, $arr);
            }
        }

        return $permissions;
    }

    final public function discover() {
        $contract = $this->getContract();

        $out = array();
        $out['name'] = $contract->getShortName();
        $methods = array();

        foreach($contract->getMethods() as $method) {
            $methods[$method->getName()] = array_map(function($item) { return $item->getName(); }, $method->getParameters());
        }

        $out['methods'] = (object)$methods;

        return $this->serializeOutput((object)$out);
    }

    final public function handleRequest($method, $data) {
        $args = $this->deserializeInput($data);

        $contract = $this->getContract();

        $reflectionMethod = new \ReflectionMethod($contract->getName(), $method);

        $permissions = $this->getMethodPermissions($reflectionMethod);

        if(count($permissions) > 0) {
            $granted = (count($permissions) == 1 && count($permissions[0]) == 1 && $permissions[0][0] == 'anonymous');

            if (!$granted)
                $granted = (count($permissions) == 1 && count($permissions[0]) == 1 &&  $permissions[0][0] == 'authenticated' && !CurrentUser::getPrincipal()->isAnon());

            if (!$granted) {
                $check = true;
                foreach($permissions as $permission) {
                    /*
                     * $permissions array is two dimensional an and array of or permissions.
                     * IE $granted = has any $permission[0][n] AND has any $permission[n][n] ...
                     * E.g Contract defines 3 permission lines:
                     * @permission perm1
                     * @permission perm2|perm3
                     * @permission perm4
                     *
                     * This would translate here as perm1 && (perm2 || perm3) && perm4
                     */
                    $check &= CurrentUser::getPrincipal()->hasAnyPermissions(...$permission);
                }

                $granted = $check;
            }

            if(!$granted)
                throw new UnauthorizedException();
        } else {
            throw new InvalidContractException("Service contract method requires permission context.");
        }

        $paramNames = array_map(function( $item ){
            return $item->getName();
        }, $reflectionMethod->getParameters());

        $argvals = array();

        foreach($paramNames as $name) {
            if (!array_key_exists($name, $args)) {
                throw new InvalidRequestException("Argument mismatch on service call to " . $method);
            } else {
                if(is_array($args))
                    array_push($argvals, $args[$name]);
                else
                    array_push($argvals, $args->$name);
            }
        }

        $retval = $this->internal_service->$method(...$argvals);

        return $this->serializeOutput($retval);
    }
}