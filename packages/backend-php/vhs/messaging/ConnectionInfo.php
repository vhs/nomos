<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:36 PM.
 */

namespace vhs\messaging;

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
