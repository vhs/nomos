<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:51 PM
 */

namespace vhs\database\wheres;

use vhs\database\Table;

class WhereAnd extends Where {
    /** @var Where[] */
    public $wheres = [];

    public function __construct(Where ...$where) {
        $this->wheres = $where;
    }

    public function __updateTable(Table &$table) {
        foreach ($this->wheres as $where) {
            $where->__updateTable($table);
        }
    }

    public function generateWhere(IWhereGenerator $generator) {
        return $generator->generateAnd($this);
    }

    public function __toString() {
        $s = 'WhereAnd(';

        foreach ($this->wheres as $where) {
            $s .= '' . $where;
        }

        $s .= ')';

        return $s;
    }
}
