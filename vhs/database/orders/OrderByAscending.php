<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:25 PM
 */

namespace vhs\database\orders;

class OrderByAscending extends OrderBy {
    public function generateOrderBy(IOrderByGenerator $generator) {
        return $generator->generateAscending($this);
    }
}
