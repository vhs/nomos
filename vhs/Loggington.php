<?php

namespace vhs;

use vhs\loggers\SilentLogger;

/** @typescript */
abstract class Loggington extends Singleton {
    /** @var Logger */
    protected $logger = new SilentLogger();

    public function setLogger(Logger &$logger): void {
        $this->logger = &$logger;
    }
}
