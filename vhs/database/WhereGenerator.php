<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:50 PM
 */

namespace vhs\database;

abstract class WhereGenerator {
    abstract public function generateAnd(WhereAnd $where);
    abstract public function generateOr(WhereOr $where);
    abstract public function generateComparator(WhereComparator $where);
}
