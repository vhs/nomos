<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:58 PM
 */

namespace vhs\database\engines;


use vhs\database\OrderByAscending;
use vhs\database\OrderByDescending;
use vhs\database\OrderByGenerator;

class InMemoryOrderByGenerator extends OrderByGenerator {

    public function generateAscending(OrderByAscending $ascending) {
        // TODO: Implement generateAscending() method.
        throw new \Exception("TODO: Implement generateAscending() method.");
    }

    public function generateDescending(OrderByDescending $descending) {
        // TODO: Implement generateDescending() method.
        throw new \Exception("Implement generateDescending() method.");
    }
}