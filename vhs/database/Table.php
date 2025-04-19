<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 12:21 PM.
 */

namespace vhs\database;

use vhs\database\access\IAccess;
use vhs\database\constraints\Constraint;
use vhs\database\constraints\PrimaryKey;
use vhs\database\joins\Join;
use vhs\database\types\Type;

/** @typescript */
class Table extends Element {
    /**
     * cloneIndex.
     *
     * @var int
     */
    private static $cloneIndex = 0;

    /**
     * alias.
     *
     * @var string|null
     */
    public $alias;

    /** @var string */
    public $aliasPrefix;

    /** @var \vhs\database\access\IAccess[] */
    public $checks;

    /** @var \vhs\database\Columns */
    public $columns;

    /** @var \vhs\database\constraints\Constraint[] */
    public $constraints;

    /** @var \vhs\database\joins\Join[] */
    public $joins;

    /** @var string */
    public $name;

    /**
     * @param string                   $name
     * @param string|null              $alias
     * @param \vhs\database\joins\Join ...$join
     */
    public function __construct($name, $alias = null, Join ...$join) {
        $this->name = $name;

        if (is_null($alias)) {
            // 'm gvn' hr ll sh's gt, cptn!
            $alias = str_ireplace(['a', 'e', 'i', 'o', 'u'], '', $name);
        }

        $this->aliasPrefix = $alias;
        $this->alias = $alias . (string) self::$cloneIndex;

        if (is_null($this->joins)) {
            $this->joins = [];
        }

        foreach ($join as $j) {
            array_push($this->joins, $j);
        }

        $this->columns = new Columns();
    }

    /**
     * add a column.
     *
     * @param string                   $name
     * @param \vhs\database\types\Type $type
     * @param bool                     $serializable
     *
     * @return \vhs\database\Column|null
     */
    public function addColumn($name, Type $type, $serializable = true) {
        return $this->columns->add(new Column($this, $name, $type, $serializable));
    }

    /**
     * @param \vhs\database\IGenerator $generator
     * @param mixed|null               $value
     *
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var ITableGenerator $generator */
        return $this->generateTable($generator);
    }

    /**
     * @param ITableGenerator $generator
     *
     * @return mixed
     */
    public function generateTable(ITableGenerator $generator) {
        return $generator->generateTable($this);
    }

    /**
     * @return PrimaryKey[]
     */
    public function getPrimaryKeys() {
        $pks = [];
        foreach ($this->constraints as $constraint) {
            if ($constraint instanceof PrimaryKey) {
                array_push($pks, $constraint);
            }
        }

        return $pks;
    }

    /**
     * Undocumented function.
     *
     * @param \vhs\database\access\IAccess ...$checks
     *
     * @return void
     */
    public function setAccess(IAccess ...$checks) {
        $this->checks = $checks;
    }

    /**
     * set constraints.
     *
     * @param \vhs\database\constraints\Constraint ...$constraints
     *
     * @return void
     */
    public function setConstraints(Constraint ...$constraints) {
        $this->constraints = $constraints;
    }

    /**
     * __clone.
     *
     * @return void
     */
    public function __clone(): void {
        parent::__clone();

        self::$cloneIndex += 1;

        $this->alias = $this->aliasPrefix . (string) self::$cloneIndex;

        foreach ($this->joins as $join) {
            $join->__updateTable($this);
        }

        foreach ($this->columns->all() as $column) {
            $column->__updateTable($this);
        }

        foreach ($this->constraints as $constraint) {
            $constraint->__updateTable($this);
        }
    }
}
