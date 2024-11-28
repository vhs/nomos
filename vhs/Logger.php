<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:36 PM
 */

namespace vhs;

abstract class Logger {
    abstract public function log($message);

    public function __toString() {
        return get_called_class();
    }
}
