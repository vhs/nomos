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
    abstract public function log($message);

    public function debug($file, $line, $caller, $msg) {
        if (\DEBUG === true) {
            $this->log(sprintf('%s:%s - %s: %s', str_replace(BasePath::getBasePath(withSlash: true), '', $file), $line, $caller, $msg));
        }
    }

    public function __toString() {
        return get_called_class();
    }
}
