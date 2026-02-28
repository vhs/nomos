<?php

namespace vhs;

use vhs\loggers\SilentLogger;

/** @typescript */
abstract class Loggington extends Singleton {
    /** @var Logger */
    protected $logger;

    protected function __construct() {
        $this->logger = new SilentLogger();
    }

    public function setLogger(Logger &$logger): void {
        $this->logger = &$logger;
    }
}
