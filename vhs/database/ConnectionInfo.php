<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:35 PM.
 */

namespace vhs\database;

abstract class ConnectionInfo {
    abstract public function getDetails();

    public function __toString() {
        return var_export($this->getDetails(), true);
    }
}
