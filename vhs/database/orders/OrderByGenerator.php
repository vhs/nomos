<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:26 PM
 */

namespace vhs\database\orders;

use vhs\database\IGenerator;

abstract class OrderByGenerator implements IGenerator {
    abstract public function generateAscending(OrderByAscending $ascending);
    abstract public function generateDescending(OrderByDescending $descending);
}