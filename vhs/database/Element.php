<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/19/2015
 * Time: 10:31 AM
 */

namespace vhs\database;

use vhs\Cloneable;

abstract class Element implements IGeneratable {
    use Cloneable;

    protected function __updateTable(Table &$table) {
    }
}
