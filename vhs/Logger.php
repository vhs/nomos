<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:36 PM.
 */

namespace vhs;

/** @typescript */
abstract class Logger {
    /**
     * log.
     *
     * @param mixed $message
     *
     * @return void
     */
    abstract public function log($message);

    /**
     * debug.
     *
     * @param string $file
     * @param int    $line
     * @param string $caller
     * @param mixed  $msg
     *
     * @return void
     */
    public function debug($file, $line, $caller, $msg) {
        if (defined('DEBUG')) {
            $this->log(sprintf('%s:%s - %s: %s', str_replace(BasePath::getBasePath(withSlash: true), '', $file), $line, $caller, $msg));
        }
    }

    public function __toString() {
        return get_called_class();
    }
}
