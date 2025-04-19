<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:37 PM.
 */

namespace vhs\loggers;

use vhs\Logger;

/** @typescript */
class SilentLogger extends Logger {
    /**
     * log.
     *
     * @param mixed $message
     *
     * @return void
     */
    public function log($message) {
        //stfu
    }
}
