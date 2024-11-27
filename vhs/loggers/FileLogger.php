<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 2:37 PM
 */

namespace vhs\loggers;

use vhs\Logger;
use vhs\security\CurrentUser;

class FileLogger extends Logger {
    private $filename;
    private $file;

    public function __construct($filename) {
        $this->filename = $filename;
    }

    private function ensureFile() {
        if (!isset($this->file)) {
            $this->file = fopen($this->filename, 'a');
        }
    }

    public function log($message) {
        $this->ensureFile();
        if (is_resource($this->file)) {
            fwrite($this->file, '[' . date('Y-m-d H:i:s') . '] ' . INSTANCE_ID . ' ' . CurrentUser::getPrincipal() . ' ' . $message . PHP_EOL);
        }
    }
}
