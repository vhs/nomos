<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:36 PM
 */

namespace vhs\messaging;


abstract class ConnectionInfo {
    abstract public function getDetails();

    public function __toString() {
        return var_export($this->getDetails(), true);
    }
}
