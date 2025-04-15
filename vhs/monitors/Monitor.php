<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/08/2015
 * Time: 1:02 AM.
 */

namespace vhs\monitors;

use vhs\Logger;
use vhs\Singleton;

/**
 * @method static \vhs\monitors\Monitor getInstance()
 *
 * @typescript
 */
abstract class Monitor extends Singleton {
    /**
     * Init.
     *
     * @param \vhs\Logger|null $logger
     *
     * @return void
     */
    abstract public function Init(?Logger &$logger = null);
}
