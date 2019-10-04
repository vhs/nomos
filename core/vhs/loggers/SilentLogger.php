<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:37 PM
 */

namespace vhs\loggers;

use vhs\Logger;

class SilentLogger extends Logger {
    public function log($message) {
        //stfu
    }
}
