<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/08/2015
 * Time: 1:02 AM
 */

namespace vhs\monitors;

use vhs\Logger;
use vhs\Singleton;


abstract class Monitor extends Singleton {

    abstract public function Init(Logger $logger = null);
}