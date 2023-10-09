<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 4:16 PM
 */

namespace vhs\database\constraints;

use vhs\database\Column;
use vhs\database\Element;
use vhs\database\IGenerator;
use vhs\database\Table;

abstract class Constraint extends Element {
    public $column;

    public function __construct(Column $column) {
        $this->column = $column;
    }

    public function __updateTable(Table &$table) {
        $this->column->__updateTable($table);
    }

    public static function PrimaryKey(Column $column) {
        return new PrimaryKey($column);
    }

    public static function ForeignKey(Column $column, Table &$foreignTable, Column $on) {
        return new ForeignKey($column, $foreignTable, $on);
    }

    /**
     * @param IGenerator $generator
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var IConstraintGenerator $generator */
        return $this->generateConstraint($generator);
    }

    abstract public function generateConstraint(IConstraintGenerator $generator);
}
