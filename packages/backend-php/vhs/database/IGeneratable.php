<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 12:33 PM.
 */

namespace vhs\database;

/** @typescript */
interface IGeneratable {
    /**
     * @param \vhs\database\IGenerator $generator
     * @param mixed                    $value
     *
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null);
}
