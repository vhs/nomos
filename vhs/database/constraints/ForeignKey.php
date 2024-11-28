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

    public function __clone() {
        $this->on = clone $this->on;
    }

    public function __updateTable(Table &$table) {
        $this->table = $table;
        $this->on->__updateTable($table);
    }
}
