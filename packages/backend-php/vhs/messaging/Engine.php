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
    /**
     * connect.
     *
     * @return mixed
     */
    abstract public function connect();

    /**
     * disconnect.
     *
     * @return mixed
     */
    abstract public function disconnect();

    /**
     * setLogger.
     *
     * @param \vhs\Logger $logger
     *
     * @return void
     */
    abstract public function setLogger(Logger $logger);

    /**
     * __toString.
     *
     * @return string
     */
    public function __toString() {
        return get_called_class();
    }
}
