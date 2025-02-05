<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:17 PM.
 */

namespace vhs\database;

/** @typescript */
interface IColumnGenerator extends IGenerator {
    public function generateColumn(Column $column);
}
