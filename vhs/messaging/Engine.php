<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:26 PM.
 */

namespace vhs\messaging;

use vhs\Logger;

/** @typescript */
abstract class Engine implements IMessagingInterface {
    abstract public function connect();

    abstract public function disconnect();

    abstract public function setLogger(Logger $logger);

    public function __toString() {
        return get_called_class();
    }
}
