<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:36 PM
 */

namespace vhs\loggers;

use vhs\Logger;

class ConsoleLogger extends Logger {
    public function log($message) {
        print "[".date('Y-m-d H:i:s')."] " . $message . PHP_EOL;
    }
}
