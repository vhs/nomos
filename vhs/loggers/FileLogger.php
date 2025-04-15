<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 2:37 PM.
 */

namespace vhs\loggers;

use vhs\Logger;
use vhs\security\CurrentUser;

/** @typescript */
class FileLogger extends Logger {
    /**
     * file.
     *
     * @var resource|null
     */
    private $file;

    /**
     * filename.
     *
     * @var string
     */
    private $filename;

    /**
     * __construct.
     *
     * @param string $filename
     *
     * @return void
     */
    public function __construct($filename) {
        $this->filename = $filename;
    }

    /**
     * log.
     *
     * @param string $message
     *
     * @return void
     */
    public function log($message) {
        $this->ensureFile();
        if (is_resource($this->file)) {
            // @phpstan-ignore constant.notFound
            fwrite($this->file, '[' . date('Y-m-d H:i:s') . '] ' . INSTANCE_ID . ' ' . CurrentUser::getPrincipal() . ' ' . $message . PHP_EOL);
        }
    }

    /**
     * ensureFile.
     *
     * @return void
     */
    private function ensureFile() {
        if (!isset($this->file)) {
            $this->file = fopen($this->filename, 'a');

            if (!is_resource($this->file)) {
                throw new \Exception('Failed to open log file');
            }
        }
    }
}
