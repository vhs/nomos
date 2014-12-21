<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:51 PM
 */

namespace vhs\database\wheres;

class WhereAnd extends Where {
    public $wheres = array();

    public function __construct(Where ...$where) {
        $this->wheres = $where;
    }

    public function generateWhere(IWhereGenerator $generator) {
        return $generator->generateAnd($this);
    }

    public function __toString() {
        $s = "WhereAnd(";

        foreach($this->where as $where)
            $s .= "" . $where;

        $s .= ")";

        return $s;
    }
}