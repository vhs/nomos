<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:14 PM.
 */

namespace vhs\database;

/** @typescript */
interface IOnGenerator extends IGenerator {
    /**
     * generateOn.
     *
     * @param \vhs\database\On $on
     *
     * @return mixed
     */
    public function generateOn(On $on);
}
