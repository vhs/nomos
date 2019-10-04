<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 12:21 PM
 */

namespace vhs\database;


use vhs\database\access\IAccess;
use vhs\database\constraints\Constraint;
use vhs\database\constraints\PrimaryKey;
use vhs\database\joins\Join;
use vhs\database\types\Type;

class Table extends Element {

    /** @var int */
    private static $cloneIndex = 0;

    /** @var string */
    public $aliasPrefix;

    /** @var string */
    public $name;
    /** @var null|string */
    public $alias;
    /** @var Join[] */
    public $joins;
    /** @var Columns */
    public $columns;
    /** @var Constraint[] */
    public $constraints;
    /** @var IAccess[] */
    public $checks;

    /**
     * @param string $name
     * @param string $alias
     * @param Join|joins\Join[] $join
     */
    public function __construct($name, $alias = null, Join ...$join) {
        $this->name = $name;

        if (is_null($alias)) // 'm gvn' hr ll sh's gt, cptn!
            $alias = str_ireplace(array('a','e','i','o','u'), '', $name);

        $this->aliasPrefix = $alias;
        $this->alias = $alias . (string)self::$cloneIndex;

        if (is_null($this->joins))
            $this->joins = array();

        foreach($join as $j)
            array_push($this->joins, $j);

        $this->columns = new Columns();
    }

    public function __clone() {
        parent::__clone();

        self::$cloneIndex += 1;

        $this->alias = $this->aliasPrefix . (string)self::$cloneIndex;

        foreach($this->joins as $join)
            $join->__updateTable($this);

        foreach($this->columns->all() as $column)
            $column->__updateTable($this);

        foreach($this->constraints as $constraint)
            $constraint->__updateTable($this);
    }

    public function setConstraints(Constraint ...$constraints) {
        $this->constraints = $constraints;
    }

    public function setAccess(IAccess ...$checks) {
        $this->checks = $checks;
    }

    public function addColumn($name, Type $type, $serializable = true) {
        return $this->columns->add(new Column($this, $name, $type, $serializable));
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
    public function generate(IGenerator $generator, $value = null) {
        /** @var ITableGenerator $generator */
        return $this->generateTable($generator);
    }

    /**
     * @param ITableGenerator $generator
     * @return mixed
     */
    public function generateTable(ITableGenerator $generator) {
        return $generator->generateTable($this);
    }
}
