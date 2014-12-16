<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:28 PM
 */

namespace vhs\database\orders;

class OrderByDescending extends OrderBy {

    public function generateOrderBy(OrderByGenerator $generator) {
        return $generator->generateDescending($this);
    }
}