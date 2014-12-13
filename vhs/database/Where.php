<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:49 PM
 */

namespace vhs\database;

abstract class Where {

    public static function _And(Where ...$where) {
        return new WhereAnd(...$where);
    }

    public static function _Or(Where ...$where) {
        return new WhereOr(...$where);
    }

    public static function Equal($column, $value) {
        return new WhereComparator($column, $value, false, true, false, false);
    }

    public static function NotEqual($column, $value) {
        return new WhereComparator($column, $value, false, false, false, false);
    }

    public static function Greater($column, $value) {
        return new WhereComparator($column, $value, false, false, true, false);
    }

    public static function GreaterEqual($column, $value) {
        return new WhereComparator($column, $value, false, true, true, false);
    }

    public static function Lesser($column, $value) {
        return new WhereComparator($column, $value, false, false, false, true);
    }

    public static function LesserEqual($column, $value) {
        return new WhereComparator($column, $value, false, true, false, true);
    }

    public static function Null($column) {
        return new WhereComparator($column, null, true, true, false, false);
    }

    public static function NotNull($column) {
        return new WhereComparator($column, null, true, false, false, false);
    }

    public static function In($column, array $value) {
        return self::Equal($column, $value);
    }

    public static function NotIn($column, array $value) {
        return self::NotEqual($column, $value);
    }

    abstract public function generate(WhereGenerator $generator);
}
