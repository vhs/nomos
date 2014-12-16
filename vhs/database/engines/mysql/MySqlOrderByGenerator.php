<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:48 PM
 */

namespace vhs\database\engines\mysql;


use vhs\database\orders\OrderBy;
use vhs\database\orders\OrderByAscending;
use vhs\database\orders\OrderByDescending;
use vhs\database\orders\OrderByGenerator;

class MySqlOrderByGenerator extends OrderByGenerator {

    public function generateAscending(OrderByAscending $ascending) {
        return $this->gen($ascending, "ASC");
    }

    public function generateDescending(OrderByDescending $descending) {
        return $this->gen($descending, "DESC");
    }

    private function gen(OrderBy $orderBy, $type) {
        $clause = $orderBy->column->name . " " . $type . ", ";

        foreach($orderBy->orderBy as $n)
            /** @var OrderBy $n */
            $clause .= $n->generate($this) . ", ";

        $clause = substr($clause, 0, -2);

        return $clause;
    }
}