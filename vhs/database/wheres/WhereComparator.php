<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:54 PM
 */

namespace vhs\database\wheres;

use vhs\database\Column;
use vhs\database\Table;

class WhereComparator extends Where {
    public $isArray = false;
    public $equal = true;
    public $greater = false;
    public $lesser = false;
    public $null_compare = false;
    public $like = false;
    /** @var Column */
    public $column;
    public $value;

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

    public function __updateTable(Table &$table) {
        $this->column->__updateTable($table);
    }

    public function generateWhere(IWhereGenerator $generator) {
        return $generator->generateComparator($this);
    }

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
}
