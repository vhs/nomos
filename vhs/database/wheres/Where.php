<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:49 PM.
 */

namespace vhs\database\wheres;

use vhs\database\Column;
use vhs\database\Element;
use vhs\database\IGenerator;
use vhs\database\queries\Query;

/** @typescript */
abstract class Where extends Element {
    /**
     * _And.
     *
     * @param Where ...$where
     *
     * @return WhereAnd
     */
    public static function _And(Where ...$where) {
        return new WhereAnd(...$where);
    }

    /**
     * _Or.
     *
     * @param Where ...$where
     *
     * @return WhereOr
     */
    public static function _Or(Where ...$where) {
        return new WhereOr(...$where);
    }

    /**
     * Equal.
     *
     * @param Column $column
     * @param mixed  $value
     *
     * @return WhereComparator
     */
    public static function Equal(Column $column, $value) {
        return new WhereComparator($column, $value, false, true, false, false);
    }

    /**
     * Greater.
     *
     * @param Column $column
     * @param mixed  $value
     *
     * @return WhereComparator
     */
    public static function Greater(Column $column, $value) {
        return new WhereComparator($column, $value, false, false, true, false);
    }

    /**
     * GreaterEqual.
     *
     * @param Column $column
     * @param mixed  $value
     *
     * @return WhereComparator
     */
    public static function GreaterEqual(Column $column, $value) {
        return new WhereComparator($column, $value, false, true, true, false);
    }

    /**
     * In.
     *
     * @param Column $column
     * @param mixed  $value
     *
     * @return WhereComparator
     */
    public static function In(Column $column, $value) {
        return self::Equal($column, $value);
    }

    /**
     * Lesser.
     *
     * @param Column $column
     * @param mixed  $value
     *
     * @return WhereComparator
     */
    public static function Lesser(Column $column, $value) {
        return new WhereComparator($column, $value, false, false, false, true);
    }

    /**
     * LesserEqual.
     *
     * @param Column $column
     * @param mixed  $value
     *
     * @return WhereComparator
     */
    public static function LesserEqual(Column $column, $value) {
        return new WhereComparator($column, $value, false, true, false, true);
    }

    /**
     * Like.
     *
     * @param Column $column
     * @param mixed  $value
     *
     * @return WhereComparator
     */
    public static function Like(Column $column, $value) {
        return new WhereComparator($column, $value, false, false, false, false, true);
    }

    /**
     * NotEqual.
     *
     * @param Column $column
     * @param mixed  $value
     *
     * @return WhereComparator
     */
    public static function NotEqual(Column $column, $value) {
        return new WhereComparator($column, $value, false, false, false, false);
    }

    /**
     * NotIn.
     *
     * @param Column $column
     * @param mixed  $value
     *
     * @return WhereComparator
     */
    public static function NotIn(Column $column, $value) {
        return self::NotEqual($column, $value);
    }

    /**
     * NotNull.
     *
     * @param Column $column
     *
     * @return WhereComparator
     */
    public static function NotNull(Column $column) {
        return new WhereComparator($column, null, true, false, false, false);
    }

    /**
     * null.
     *
     * @param Column $column
     *
     * @return WhereComparator
     */
    public static function null(Column $column) {
        return new WhereComparator($column, null, true, true, false, false);
    }

    /**
     * generateWhere.
     *
     * @param IWhereGenerator $generator
     *
     * @return mixed
     */
    abstract public function generateWhere(IWhereGenerator $generator);

    /**
     * @param IGenerator $generator
     * @param mixed      $value
     *
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var IWhereGenerator $generator */
        return $this->generateWhere($generator);
    }

    abstract public function __toString();
}
