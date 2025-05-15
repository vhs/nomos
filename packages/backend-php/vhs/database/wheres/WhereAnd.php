<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:51 PM.
 */

namespace vhs\database\wheres;

use vhs\database\Table;

/** @typescript */
class WhereAnd extends Where {
    /** @var (Where|null)[] */
    public $wheres = [];

    /**
     * __construct.
     *
     * @param (Where|null) $where
     *
     * @return void
     */
    public function __construct(Where|null ...$where) {
        $this->wheres = $where;
    }

    /**
     * generateWhere.
     *
     * @param \vhs\database\wheres\IWhereGenerator $generator
     *
     * @return mixed
     */
    public function generateWhere(IWhereGenerator $generator) {
        return $generator->generateAnd($this);
    }

    /**
     * __toString.
     *
     * @return string
     */
    public function __toString() {
        $s = 'WhereAnd(';

        foreach ($this->wheres as $where) {
            $s .= '' . $where;
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
        foreach ($this->wheres as $where) {
            $where->__updateTable($table);
        }
    }
}
