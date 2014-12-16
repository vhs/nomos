<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 12:21 PM
 */

namespace vhs\database;


use vhs\database\constraints\Constraint;
use vhs\database\constraints\PrimaryKey;
use vhs\database\joins\Join;
use vhs\database\types\Type;

class Table implements IGeneratable {

    /** @var string */
    public $name;
    /** @var Join */
    public $join;
    /** @var Columns */
    public $columns;
    /** @var Constraint[] */
    public $constraints;

    /**
     * @param string $name
     * @param Join $join
     */
    public function __construct($name, Join $join = null) {
        $this->name = $name;
        $this->join = $join;
        $this->columns = new Columns();
    }

    public function setConstraints(Constraint ...$constraints) {
        $this->constraints = $constraints;
    }

    public function addColumn($name, Type $type) {
        return $this->columns->add(new Column($this, $name, $type));
    }

    /**
     * @return PrimaryKey[]
     */
    public function getPrimaryKeys() {
        $pks = array();
        foreach($this->constraints as $constraint)
            if($constraint instanceof PrimaryKey)
                array_push($pks, $constraint);

        return $pks;
    }

    /**
     * @param IGenerator $generator
     * @return mixed
     */
    public function generate(IGenerator $generator) {
        /** @var TableGenerator $generator */
        return $this->generateTable($generator);
    }

    /**
     * @param TableGenerator $generator
     * @return mixed
     */
    public function generateTable(TableGenerator $generator) {
        return $generator->generateTable($this);
    }
}
