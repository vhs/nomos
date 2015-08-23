<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:52 PM
 */

namespace vhs\database;


use vhs\Cloneable;

class Columns {
    use Cloneable;
    /** @var Column[] */
    public $__columns;

    public function __construct(Column ...$columns) {
        $this->__columns = $columns;
    }

    public function __get($name) {
        return $this->getByName($name);
    }

    /**
     * @return Column[]
     */
    public function all() {
        return $this->__columns;
    }

    public function names() {
        $names = array();

        foreach($this->all() as $col)
            array_push($names, $col->name);

        return $names;
    }

    public function add(Column $column) {
        if(!$this->contains($column->name)) {
            array_push($this->__columns, $column);

            return $column;
        }

        return null;
    }

    public function remove(Column $column) {
        if(!$this->contains($column->name))
            return;

        foreach($this->__columns as $key => $col) {
            if (self::Equals($col, $column))
                unset($this->__columns[$key]);
        }
    }

    public static function Equals(Column $a, Column $b) {
        return (
            ($a->name === $b->name)
            &&
            ($a->table === $b->table)
            &&
            ($a->type === $b->type)
        );
    }

    public static function EqualsByName(Column $a, $name) {
        return ($a->name === $name);
    }

    public function contains($column) {
        foreach($this->__columns as $col)
            if ($col->name == $column)
                return true;

        return false;
    }

    public function getByName($name) {
        foreach($this->__columns as $col)
            if ($col->name == $name)
                return $col;

        return null;
    }
}