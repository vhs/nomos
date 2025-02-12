<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:50 PM.
 */

namespace vhs\database\wheres;

use vhs\database\IGenerator;

/** @typescript */
interface IWhereGenerator extends IGenerator {
    public function generateAnd(WhereAnd $where);

    public function generateComparator(WhereComparator $where);

    public function generateOr(WhereOr $where);
}
