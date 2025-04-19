<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 4:20 PM.
 */

namespace vhs\database\constraints;

use vhs\database\Column;
use vhs\database\Table;

/** @typescript */
class ForeignKey extends Constraint {
    /** @var Column */
    public $on;
    /** @var Table */
    public $table;

    public function __construct(Column $column, Table &$table, Column $on) {
        $this->table = $table;
        $this->on = $on;

        parent::__construct($column);
    }

    public function generateConstraint(IConstraintGenerator $generator) {
        return $generator->generateForeignKey($this);
    }

    /**
     * __clone.
     *
     * @return void
     */
    public function __clone(): void {
        $this->on = clone $this->on;
    }

    public function __updateTable(Table &$table) {
        $this->table = $table;
        $this->on->__updateTable($table);
    }
}
