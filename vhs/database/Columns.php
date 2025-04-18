<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:52 PM.
 */

namespace vhs\database;

use vhs\Cloneable;

/** @typescript */
class Columns {
    use Cloneable;

    /** @var Column[] */
    public $__columns;

    public function __construct(Column ...$columns) {
        $this->__columns = $columns;
    }

    /**
     * compare Column $a to Column $b.
     *
     * @param Column $a
     * @param Column $b
     *
     * @return bool
     */
    public static function Equals(Column $a, Column $b) {
        return $a->name === $b->name && $a->table === $b->table && $a->type === $b->type;
    }

    /**
     * Check if Column $a's name matches $name.
     *
     * @param Column $a
     * @param string $name
     *
     * @return bool
     */
    public static function EqualsByName(Column $a, $name) {
        return $a->name === $name;
    }

    /**
     * add a column definition.
     *
     * @param Column $column
     *
     * @return \vhs\database\Column|null
     */
    public function add(Column $column) {
        if (!$this->contains($column->name)) {
            array_push($this->__columns, $column);

            return $column;
        }

        return null;
    }

    /**
     * @return Column[]
     */
    public function all() {
        return $this->__columns;
    }

    /**
     * check if Column set contains the specified column name.
     *
     * @param string $column
     *
     * @return bool
     */
    public function contains($column) {
        foreach ($this->__columns as $col) {
            if ($col->name == $column) {
                return true;
            }
        }

        return false;
    }

    /**
     * get a column by name.
     *
     * @param string $name
     *
     * @return \vhs\database\Column|null
     */
    public function getByName($name) {
        foreach ($this->__columns as $col) {
            if ($col->name == $name) {
                return $col;
            }
        }

        return null;
    }

    /**
     * get column names.
     *
     * @return string[]
     */
    public function names() {
        $names = [];

        foreach ($this->all() as $col) {
            array_push($names, $col->name);
        }

        return $names;
    }

    /**
     * remove a column.
     *
     * @param Column $column
     *
     * @return void
     */
    public function remove(Column $column) {
        if (!$this->contains($column->name)) {
            return;
        }

        foreach ($this->__columns as $key => $col) {
            if (self::Equals($col, $column)) {
                unset($this->__columns[$key]);
            }
        }
    }

    /**
     * column getter.
     *
     * @param string $name
     *
     * @return \vhs\database\Column|null
     */
    public function __get($name) {
        return $this->getByName($name);
    }
}
