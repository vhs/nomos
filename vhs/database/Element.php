<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/19/2015
 * Time: 10:31 AM.
 */

namespace vhs\database;

use vhs\Cloneable;

/** @typescript */
abstract class Element implements IGeneratable {
    use Cloneable;

    /**
     * __updateTable.
     *
     * @param \vhs\database\Table &$table
     *
     * @return mixed
     */
    protected function __updateTable(Table &$table) {}
}
