<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 3:59 PM.
 */

namespace vhs\services;

use vhs\services\endpoints\Endpoint;

/** @typescript */
class ServiceContext {
    /**
     * endpoint.
     *
     * @var \vhs\services\endpoints\Endpoint
     */
    public $endpoint;

    /**
     * __construct.
     *
     * @param \vhs\services\endpoints\Endpoint $endpoint
     *
     * @return void
     */
    public function __construct(Endpoint $endpoint) {
        $this->endpoint = $endpoint;
    }

    /**
     * log.
     *
     * @param mixed $message
     *
     * @return void
     */
    public function log($message) {
        if (is_null($this->endpoint->logger)) {
            return;
        }

        $type = get_class($this->endpoint);

        $this->endpoint->logger->log("[{$type}] $message");
    }
}
