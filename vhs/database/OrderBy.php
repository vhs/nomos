<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:23 PM
 */

namespace vhs\database;

abstract class OrderBy {
    public static function Ascending($column, OrderBy ...$orderBy) {
        return new OrderByAscending($column, $orderBy);
    }

    public static function Descending($column, OrderBy ...$orderBy) {
        return new OrderByDescending($column, $orderBy);
    }

    abstract public function generate(OrderByGenerator $generator);
}