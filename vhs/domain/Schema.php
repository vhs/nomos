<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 2:06 PM.
 */

namespace vhs\domain;

use vhs\database\Columns;
use vhs\database\constraints\ForeignKey;
use vhs\database\constraints\PrimaryKey;
use vhs\database\Table;

/** @typescript */
interface ISchema {
    /**
     * init.
     *
     * @return Table
     */
    public static function init();
}

/** @typescript */
abstract class Schema implements ISchema {
    /**
     * internal_table.
     *
     * @var mixed
     */
    private $internal_table;

    /**
     * __construct.
     *
     * @return void
     */
    protected function __construct() {
        $this->internal_table = $this->init();
    }

    /**
     * Table.
     *
     * @return \vhs\database\Table
     */
    public static function &Table() {
        return self::getInstance()->internal_table;
    }

    /**
     * Column.
     *
     * @param mixed $name
     *
     * @return \vhs\database\Column
     */
    public static function Column($name) {
        return self::Table()->columns->$name;
    }

    /**
     * @return Columns
     */
    /**
     * Columns.
     *
     * @return \vhs\database\Columns
     */
    public static function Columns() {
        return self::Table()->columns;
    }

    /**
     * Constraints.
     *
     * @return \vhs\database\constraints\Constraint[]
     */
    public static function Constraints() {
        return self::Table()->constraints;
    }

    /**
     * ForeignKeys.
     *
     * @return \vhs\database\constraints\ForeignKey[]
     */
    public static function ForeignKeys() {
        $fks = [];

        foreach (self::Table()->constraints as $constraint) {
            if ($constraint instanceof ForeignKey) {
                array_push($fks, $constraint);
            }
        }

        return $fks;
    }

    /**
     * PrimaryKeys.
     *
     * @return \vhs\database\constraints\PrimaryKey[]
     */
    public static function PrimaryKeys() {
        $pks = [];
        foreach (self::Table()->constraints as $constraint) {
            if ($constraint instanceof PrimaryKey) {
                array_push($pks, $constraint);
            }
        }

        return $pks;
    }

    /**
     * Type.
     *
     * @return \vhs\domain\Schema
     */
    final public static function Type() {
        return self::getInstance();
    }

    /**
     * getInstance.
     *
     * @return \vhs\domain\Schema
     */
    private static function getInstance() {
        static $aoInstance = [];

        $class = get_called_class();

        if (!isset($aoInstance[$class])) {
            $aoInstance[$class] = new $class();
        }

        return $aoInstance[$class];
    }

    /**
     * __clone.
     *
     * @return void
     */
    private function __clone() {}
}
