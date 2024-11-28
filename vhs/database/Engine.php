<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:31 PM
 */

namespace vhs\database;

use vhs\Logger;

abstract class Engine implements IDataInterface {
    abstract public function connect();

    abstract public function disconnect();

    abstract public function setLogger(Logger $logger);

    public function __toString() {
        return get_called_class();
    }
}
