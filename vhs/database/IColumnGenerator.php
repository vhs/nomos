<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:17 PM.
 */

namespace vhs\database;

interface IColumnGenerator extends IGenerator {
    public function generateColumn(Column $column);
}
