<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:26 PM
 */

namespace vhs\database\orders;

use vhs\database\IGenerator;

interface IOrderByGenerator extends IGenerator {
    public function generateAscending(OrderByAscending $ascending);

    public function generateDescending(OrderByDescending $descending);
}
