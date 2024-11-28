<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:23 PM.
 */

namespace vhs\database\orders;

use vhs\database\Column;
use vhs\database\Element;
use vhs\database\IGenerator;
use vhs\database\Table;

abstract class OrderBy extends Element {
    /** @var Column */
    public $column;
    /** @var OrderBy[] */
    public $orderBy = [];

    public function __construct(Column $column, OrderBy ...$orderBy) {
        $this->column = $column;
        $this->orderBy = $orderBy;
    }

    public static function Ascending(Column $column, OrderBy ...$orderBy) {
        return new OrderByAscending($column, ...$orderBy);
    }

    public static function Descending(Column $column, OrderBy ...$orderBy) {
        return new OrderByDescending($column, ...$orderBy);
    }

    abstract public function generateOrderBy(IOrderByGenerator $generator);

    public function generate(IGenerator $generator, $value = null) {
        /** @var IOrderByGenerator $generator */
        return $this->generateOrderBy($generator);
    }

    public function __updateTable(Table &$table) {
        $this->column->__updateTable($table);

        foreach ($this->orderBy as $orderBy) {
            $orderBy->__updateTable($table);
        }
    }
}
