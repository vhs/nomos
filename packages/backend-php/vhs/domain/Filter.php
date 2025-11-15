<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/11/2015
 * Time: 9:27 PM.
 */

namespace vhs\domain;

/** @typescript */
class Filter {
    /**
     * column.
     *
     * @var mixed
     */
    public $column;

    /**
     * left.
     *
     * @var mixed
     */
    public $left;

    /**
     * operator.
     *
     * @var mixed
     */
    public $operator;

    /**
     * right.
     *
     * @var mixed
     */
    public $right;

    /**
     * value.
     *
     * @var mixed
     */
    public $value;

    /**
     * __construct.
     *
     * @param mixed $left
     * @param mixed $column
     * @param mixed $operator
     * @param mixed $right
     * @param mixed $value
     *
     * @return void
     */
    public function __construct($left = null, $column = null, $operator = null, $right = null, $value = null) {
        $this->left = $left;
        $this->column = $column;
        $this->operator = $operator;
        $this->right = $right;
        $this->value = $value;
    }

    /**
     * _And.
     *
     * @param mixed $left
     * @param mixed $right
     *
     * @return \vhs\domain\Filter
     */
    public static function _And($left, $right) {
        return new Filter($left, null, 'and', $right, null);
    }

    /**
     * _Or.
     *
     * @param mixed $left
     * @param mixed $right
     *
     * @return \vhs\domain\Filter
     */
    public static function _Or($left, $right) {
        return new Filter($left, null, 'or', $right, null);
    }

    /**
     * Equal.
     *
     * @param mixed $column
     * @param mixed $value
     *
     * @return \vhs\domain\Filter
     */
    public static function Equal($column, $value) {
        return new Filter(null, $column, '=', null, $value);
    }

    /**
     * Greater.
     *
     * @param mixed $column
     * @param mixed $value
     *
     * @return \vhs\domain\Filter
     */
    public static function Greater($column, $value) {
        return new Filter(null, $column, '>', null, $value);
    }

    /**
     * GreaterEqual.
     *
     * @param mixed $column
     * @param mixed $value
     *
     * @return \vhs\domain\Filter
     */
    public static function GreaterEqual($column, $value) {
        return new Filter(null, $column, '>=', null, $value);
    }

    /**
     * IsNotNull.
     *
     * @param mixed $column
     * @param mixed $value
     *
     * @return \vhs\domain\Filter
     */
    public static function IsNotNull($column, $value) {
        return new Filter(null, $column, 'not null', null, null);
    }

    /**
     * IsNull.
     *
     * @param mixed $column
     *
     * @return \vhs\domain\Filter
     */
    public static function IsNull($column) {
        return new Filter(null, $column, 'is null', null, null);
    }

    /**
     * Lesser.
     *
     * @param mixed $column
     * @param mixed $value
     *
     * @return \vhs\domain\Filter
     */
    public static function Lesser($column, $value) {
        return new Filter(null, $column, '<', null, $value);
    }

    /**
     * LesserEqual.
     *
     * @param mixed $column
     * @param mixed $value
     *
     * @return \vhs\domain\Filter
     */
    public static function LesserEqual($column, $value) {
        return new Filter(null, $column, '<=', null, $value);
    }

    /**
     * Like.
     *
     * @param mixed $column
     * @param mixed $value
     *
     * @return \vhs\domain\Filter
     */
    public static function Like($column, $value) {
        return new Filter(null, $column, 'like', null, $value);
    }

    /**
     * NotEqual.
     *
     * @param mixed $column
     * @param mixed $value
     *
     * @return \vhs\domain\Filter
     */
    public static function NotEqual($column, $value) {
        return new Filter(null, $column, '!=', null, $value);
    }
}
