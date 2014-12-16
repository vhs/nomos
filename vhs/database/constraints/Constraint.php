<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 4:16 PM
 */

namespace vhs\database\constraints;


use vhs\database\Column;
use vhs\database\IGeneratable;
use vhs\database\IGenerator;
use vhs\database\Table;

abstract class Constraint implements IGeneratable {

    public $column;

    public function __construct(Column $column) {
        $this->column = $column;
    }

    public static function PrimaryKey(Column $column) {
        return new PrimaryKey($column);
    }

    public static function ForeignKey(Column $column, Table $foreignTable, Column $on) {
        return new ForeignKey($column, $foreignTable, $on);
    }

    /**
     * @param IGenerator $generator
     * @return mixed
     */
    public function generate(IGenerator $generator) {
        /** @var ConstraintGenerator $generator */
        return $this->generateConstraint($generator);
    }

    abstract public function generateConstraint(ConstraintGenerator $generator);
}