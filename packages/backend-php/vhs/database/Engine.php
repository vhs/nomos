<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:31 PM.
 */

namespace vhs\database;

use vhs\Logger;

/** @typescript */
abstract class Engine implements IDataInterface {
    /**
     * connect.
     *
     * @return bool
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
