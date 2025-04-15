<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/27/2015
 * Time: 3:48 PM.
 */

namespace vhs\loggers;

use vhs\Logger;

/** @typescript */
class StringLogger extends Logger {
    /** @var string[] */
    public array $history;

    public function __construct() {
        $this->history = [];
    }

    /**
     * fullText.
     *
     * @return string
     */
    public function fullText() {
        return implode("\n", $this->history);
    }

    public function log($message) {
        array_push($this->history, $message);
    }
}
