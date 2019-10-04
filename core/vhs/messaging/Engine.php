<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:26 PM
 */

namespace vhs\messaging;


use vhs\Logger;

abstract class Engine implements IMessagingInterface {

    abstract public function setLogger(Logger $logger);
    abstract public function connect();
    abstract public function disconnect();

    public function __toString() {
        return get_called_class();
    }
}
