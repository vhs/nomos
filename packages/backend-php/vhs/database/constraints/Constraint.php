<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 4:16 PM.
 */

namespace vhs\database\constraints;

use vhs\database\Column;
use vhs\database\Element;
use vhs\database\IGenerator;
use vhs\database\Table;

/** @typescript */
abstract class Constraint extends Element {
    /**
     * column.
     *
     * @var \vhs\database\Column
     */
    public $column;

    /**
     * __construct.
     *
     * @param \vhs\database\Column $column
     *
     * @return void
     */
    public function __construct(Column $column) {
        $this->column = $column;
    }

    /**
     * ForeignKey.
     *
     * @param \vhs\database\Column $column
     * @param \vhs\database\Table  $foreignTable
     * @param \vhs\database\Column $on
     *
     * @return \vhs\database\constraints\ForeignKey
     */
    public static function ForeignKey(Column $column, Table &$foreignTable, Column $on) {
        return new ForeignKey($column, $foreignTable, $on);
    }

    /**
     * PrimaryKey.
     *
     * @param \vhs\database\Column $column
     *
     * @return \vhs\database\constraints\PrimaryKey
     */
    public static function PrimaryKey(Column $column) {
        return new PrimaryKey($column);
    }

    /**
     * generateConstraint.
     *
     * @param \vhs\database\constraints\IConstraintGenerator $generator
     *
     * @return mixed
     */
    abstract public function generateConstraint(IConstraintGenerator $generator);

    /**
     * @param \vhs\database\IGenerator $generator
     * @param mixed|null               $value
     *
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var IConstraintGenerator $generator */
        return $this->generateConstraint($generator);
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
    }
}
