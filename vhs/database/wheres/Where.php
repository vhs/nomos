<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:49 PM
 */

namespace vhs\database\wheres;

use vhs\database\Column;
use vhs\database\Element;
use vhs\database\IGenerator;

abstract class Where extends Element {

    public static function _And(Where ...$where) {
        return new WhereAnd(...$where);
    }

    public static function _Or(Where ...$where) {
        return new WhereOr(...$where);
    }

    public static function Equal(Column $column, $value) {
        return new WhereComparator($column, $value, false, true, false, false);
    }

    public static function NotEqual(Column $column, $value) {
        return new WhereComparator($column, $value, false, false, false, false);
    }

    public static function Greater(Column $column, $value) {
        return new WhereComparator($column, $value, false, false, true, false);
    }

    public static function GreaterEqual(Column $column, $value) {
        return new WhereComparator($column, $value, false, true, true, false);
    }

    public static function Lesser(Column $column, $value) {
        return new WhereComparator($column, $value, false, false, false, true);
    }

    public static function LesserEqual(Column $column, $value) {
        return new WhereComparator($column, $value, false, true, false, true);
    }

    public static function Null(Column $column) {
        return new WhereComparator($column, null, true, true, false, false);
    }

    public static function NotNull(Column $column) {
        return new WhereComparator($column, null, true, false, false, false);
    }

    public static function In(Column $column, array $value) {
        return self::Equal($column, $value);
    }

    public static function NotIn(Column $column, array $value) {
        return self::NotEqual($column, $value);
    }

    /**
     * @param IGenerator $generator
     * @param null $value
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var IWhereGenerator $generator */
        return $this->generateWhere($generator);
    }

    abstract public function generateWhere(IWhereGenerator $generator);

    abstract public function __toString();
}
