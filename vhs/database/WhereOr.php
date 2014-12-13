<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:54 PM
 */

namespace vhs\database;

class WhereOr extends Where {
    public $wheres = array();

    public function __construct(Where ...$where) {
        $this->wheres = $where;
    }

    public function generate(WhereGenerator $generator) {
        return $generator->generateOr($this);
    }
}
