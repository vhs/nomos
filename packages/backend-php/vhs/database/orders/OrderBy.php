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

/** @typescript */
abstract class OrderBy extends Element {
    /** @var Column */
    public $column;
    /** @var OrderBy[] */
    public $orderBy = [];

    /**
     * constructor.
     *
     * @param Column  $column
     * @param OrderBy ...$orderBy
     */
    public function __construct(Column $column, OrderBy ...$orderBy) {
        $this->column = $column;
        $this->orderBy = $orderBy;
    }

    /**
     * Ascending.
     *
     * @param Column  $column
     * @param OrderBy ...$orderBy
     *
     * @return OrderByAscending
     */
    public static function Ascending(Column $column, OrderBy ...$orderBy) {
        return new OrderByAscending($column, ...$orderBy);
    }

    /**
     * Descending.
     *
     * @param Column  $column
     * @param OrderBy ...$orderBy
     *
     * @return OrderByDescending
     */
    public static function Descending(Column $column, OrderBy ...$orderBy) {
        return new OrderByDescending($column, ...$orderBy);
    }

    /**
     * generateOrderBy.
     *
     * @param IOrderByGenerator $generator
     *
     * @return mixed
     */
    abstract public function generateOrderBy(IOrderByGenerator $generator);

    /**
     * generate.
     *
     * @param IOrderByGenerator $generator
     * @param mixed             $value
     *
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        return $this->generateOrderBy($generator);
    }

    /**
     * __updateTable.
     *
     * @param \vhs\database\Table $table
     *
     * @return void
     */
    public function __updateTable(Table &$table) {
        $this->column->__updateTable($table);

        foreach ($this->orderBy as $orderBy) {
            $orderBy->__updateTable($table);
        }
    }
}
