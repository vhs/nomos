<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 3:58 PM.
 */

namespace vhs\services;

/** @typescript */
abstract class Service {
    /** @var ServiceContext $context */
    protected $context;

    public function __construct(ServiceContext $context = null) {
        $this->context = $context;
    }

    protected function throwNotFound(string $className) {
        throw new \vhs\domain\exceptions\DomainException($className + ' not found', 404);
    }
}
