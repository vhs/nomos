<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:35 PM.
 */

namespace vhs\database;

/** @typescript */
abstract class ConnectionInfo {
    /**
     * getDetails.
     *
     * @return array<string,mixed>
     */
    abstract public function getDetails();

    /**
     * __toString.
     *
     * @return string
     */
    public function __toString() {
        return var_export($this->getDetails(), true);
    }
}
