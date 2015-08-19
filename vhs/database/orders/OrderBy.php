<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:23 PM
 */

namespace vhs\database\orders;

use vhs\database\Column;
use vhs\database\IGeneratable;
use vhs\database\IGenerator;

abstract class OrderBy implements IGeneratable {

    public $column;
    public $orderBy = array();

    public function __construct(Column $column, OrderBy ...$orderBy) {
        $this->column = $column;
        $this->orderBy = $orderBy;
    }

    public static function Ascending(Column $column, OrderBy ...$orderBy) {
        return new OrderByAscending($column, $orderBy);
    }

    public static function Descending(Column $column, OrderBy ...$orderBy) {
        return new OrderByDescending($column, $orderBy);
    }

    public function generate(IGenerator $generator, $value = null) {
        /** @var IOrderByGenerator $generator */
        return $this->generateOrderBy($generator);
    }

    abstract public function generateOrderBy(IOrderByGenerator $generator);
}