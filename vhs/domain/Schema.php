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
     * @return Table
     */
    public static function init();
}

/** @typescript */
abstract class Schema implements ISchema {
    private $internal_table;

    protected function __construct() {
        $this->internal_table = $this->init();
    }

    /**
     * @return Table
     */
    public static function &Table() {
        return self::getInstance()->internal_table;
    }

    public static function Column($name) {
        return self::Table()->columns->$name;
    }

    /**
     * @return Columns
     */
    public static function Columns() {
        return self::Table()->columns;
    }

    public static function Constraints() {
        return self::Table()->constraints;
    }

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
     * @return PrimaryKey[]
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
     * @return Schema
     */
    final public static function Type() {
        return self::getInstance();
    }

    /**
     * @return Schema
     */
    private static function getInstance() {
        static $aoInstance = [];

        $class = get_called_class();

        if (!isset($aoInstance[$class])) {
            $aoInstance[$class] = new $class();
        }

        return $aoInstance[$class];
    }

    private function __clone() {}
}
