<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:54 PM.
 */

namespace vhs\database\wheres;

use vhs\database\Column;
use vhs\database\Table;

/** @typescript */
class WhereComparator extends Where {
    /**
     * column.
     *
     * @var \vhs\database\Column
     */
    public $column;

    /**
     * equal.
     *
     * @var bool
     */
    public $equal = true;

    /**
     * greater.
     *
     * @var bool
     */
    public $greater = false;

    /**
     * isArray.
     *
     * @var bool
     */
    public $isArray = false;

    /**
     * lesser.
     *
     * @var bool
     */
    public $lesser = false;

    /**
     * like.
     *
     * @var bool
     */
    public $like = false;

    /**
     * null_compare.
     *
     * @var bool
     */
    public $null_compare = false;

    /**
     * value.
     *
     * @var mixed
     */
    public $value;

    /**
     * __construct.
     *
     * @param \vhs\database\Column $column
     * @param mixed                $value
     * @param mixed                $null_compare
     * @param mixed                $equal
     * @param mixed                $greater
     * @param mixed                $lesser
     * @param mixed                $like
     *
     * @return void
     */
    public function __construct(Column $column, $value, $null_compare, $equal, $greater, $lesser, $like = false) {
        $this->column = $column;
        $this->value = $value;
        $this->null_compare = $null_compare;
        $this->equal = $equal;
        $this->greater = $greater;
        $this->lesser = $lesser;
        $this->isArray = is_array($value);
        $this->like = $like;
    }

    /**
     * generateWhere.
     *
     * @param \vhs\database\wheres\IWhereGenerator $generator
     *
     * @return callable
     */
    public function generateWhere(IWhereGenerator $generator) {
        return $generator->generateComparator($this);
    }

    /**
     * __toString.
     *
     * @return string
     */
    public function __toString() {
        $s = 'WhereComparator(';

        $s .= $this->column->name;

        if ($this->null_compare) {
            $s .= ' null_compare ';
        }

        if ($this->greater) {
            $s .= ' greater ';
        }

        if ($this->lesser) {
            $s .= ' lesser ';
        }

        if ($this->equal) {
            $s .= ' equal ';
        }

        if ($this->like) {
            $s .= ' like ';
        }

        if ($this->isArray) {
            $s .= '(' . implode(', ', $this->value) . ')';
        } else {
            $s .= '' . $this->value;
        }

        $s .= ')';

        return $s;
    }

    /**
     * __updateTable.
     *
     * @param \vhs\database\Table $table
     *
     * @return void
     */
    public function __updateTable(Table &$table) {
        $this->column->__updateTable($table);
    }
}
