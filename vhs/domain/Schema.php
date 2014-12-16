<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 2:06 PM
 */

namespace vhs\domain;


use vhs\database\Columns;
use vhs\database\constraints\PrimaryKey;
use vhs\database\Table;

abstract class Schema {
    protected $internal_table;

    protected function __construct(Table $table) {
        $this->internal_table = $table;
    }

    final public static function getInstance() {
        static $aoInstance = array();

        $class = get_called_class();

        if (!isset($aoInstance[$class]))
            $aoInstance[$class] = new $class();

        return $aoInstance[$class];
    }

    final private function __clone() { }

    public static function Table() {
        return self::getInstance()->internal_table;
    }

    /**
     * @return Columns
     */
    public static function Columns() {
        return self::getInstance()->internal_table->columns;
    }

    public static function Constraints() {
        return self::getInstance()->internal_table->contraints;
    }

    /**
     * @return PrimaryKey[]
     */
    public static function PrimaryKeys() {
        $pks = array();
        foreach(self::getInstance()->internal_table->constraints as $constraint)
            if($constraint instanceof PrimaryKey)
                array_push($pks, $constraint);

        return $pks;
    }

    public static function Column($name) {
        return self::getInstance()->$name;
    }

    public function __get($name) {
        if($this->internal_table->columns->contains($name))
            return $this->internal_table->columns->getByName($name);

        return null;
    }
}
