<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:48 PM
 */

namespace vhs\database\engines;


use vhs\database\OrderByAscending;
use vhs\database\OrderByDescending;
use vhs\database\OrderByGenerator;

class MySqlOrderByGenerator extends OrderByGenerator {

    public function generateAscending(OrderByAscending $ascending) {
        $clause = $ascending->column . ", ";

        foreach($ascending->orderBy as $orderBy)
            $clause .= substr($orderBy->generate($this), 0, -4) . ", ";

        $clause = substr($clause, 0, -2) . " ASC";

        return $clause;
    }

    public function generateDescending(OrderByDescending $descending) {
        $clause = $descending->column . ", ";

        foreach($descending->orderBy as $orderBy)
            $clause .= substr($orderBy->generate($this), 0, -5) . ", ";

        $clause = substr($clause, 0, -2) . " DESC";

        return $clause;
    }
}