<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 1:02 PM.
 */

namespace vhs;

/** @typescript */
abstract class Singleton {
    /**
     * protected skeleton constructor.
     *
     * @return void
     */
    protected function __construct() {
    }

    /**
     * get instance.
     *
     * @return \vhs\Singleton
     */
    final public static function getInstance() {
        static $aoInstance = [];

        $class = get_called_class();

        if (!isset($aoInstance[$class])) {
            $aoInstance[$class] = new $class();
        }

        return $aoInstance[$class];
    }

    /**
     * __clone.
     *
     * @return void
     */
    public function __clone(): void {
    }
}
