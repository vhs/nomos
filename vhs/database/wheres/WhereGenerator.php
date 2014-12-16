<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:50 PM
 */

namespace vhs\database\wheres;

use vhs\database\IGenerator;

abstract class WhereGenerator implements IGenerator {
    abstract public function generateAnd(WhereAnd $where);
    abstract public function generateOr(WhereOr $where);
    abstract public function generateComparator(WhereComparator $where);
}
