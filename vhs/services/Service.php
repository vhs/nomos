<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 3:58 PM.
 */

namespace vhs\services;

use vhs\exceptions\HttpException;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
abstract class Service {
    /** @var ServiceContext $context */
    protected $context;

    /**
     * __construct.
     *
     * @param \vhs\services\ServiceContext|null $context
     *
     * @return void
     */
    public function __construct(?ServiceContext $context = null) {
        $this->context = $context;
    }

    /**
     * Shared wrapper to throw a DomainException when a service handler domain class is not found.
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return void
     */
    protected function throwNotFound() {
        $className = get_called_class();

        throw new HttpException(sprintf('%s not found', $className), HttpStatusCodes::Client_Error_Not_Found);
    }
}
