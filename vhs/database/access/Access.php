<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/8/2016
 * Time: 11:43 AM
 */

namespace vhs\database\access;


use vhs\database\Column;
use vhs\database\Table;

abstract class Access implements IAccess
{
    public static function Table(Table $table, callable $check) {
        return new TableAccess($table, $check);
    }

    public static function Column(Column $column, callable $check) {
        return new ColumnAccess($column, $check);
    }
}
