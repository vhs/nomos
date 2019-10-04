<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/27/2015
 * Time: 3:48 PM
 */

namespace vhs\loggers;


use vhs\Logger;

class StringLogger extends Logger
{
    public $history;

    public function __construct()
    {
        $this->history = array();
    }

    public function log($message)
    {
        array_push($this->history, $message);
    }

    public function fullText()
    {
        return implode("\n", $this->history);
    }
}