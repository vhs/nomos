<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/11/2015
 * Time: 9:27 PM
 */

namespace vhs\domain;


class Filter
{
    public $left;
    public $column;
    public $operator;
    public $right;
    public $value;

    public function __construct($left = null, $column = null, $operator = null, $right = null, $value = null) {
        $this->left = $left;
        $this->column = $column;
        $this->operator = $operator;
        $this->right = $right;
        $this->value = $value;
    }

    public static function _And($left, $right) {
        return new Filter($left, null, "and", $right, null);
    }

    public static function _Or($left, $right) {
        return new Filter($left, null, "or", $right, null);
    }

    public static function Equal($column, $value) {
        return new Filter(null, $column, "=", null, $value);
    }

    public static function NotEqual($column, $value) {
        return new Filter(null, $column, "!=", null, $value);
    }

    public static function Lesser($column, $value) {
        return new Filter(null, $column, "<", null, $value);
    }

    public static function LesserEqual($column, $value) {
        return new Filter(null, $column, "<=", null, $value);
    }

    public static function Greater($column, $value) {
        return new Filter(null, $column, ">", null, $value);
    }

    public static function GreaterEqual($column, $value) {
        return new Filter(null, $column, ">=", null, $value);
    }

    public static function Like($column, $value) {
        return new Filter(null, $column, "like", null, $value);
    }

    public static function IsNull($column) {
        return new Filter(null, $column, "is null", null, null);
    }

    public static function IsNotNull($column, $value) {
        return new Filter(null, $column, "not null", null, null);
    }
}