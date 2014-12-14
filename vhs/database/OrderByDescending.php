<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:28 PM
 */

namespace vhs\database;

class OrderByDescending extends OrderBy {
    public $column;
    public $orderBy = array();

    public function __construct($column, OrderBy ...$orderBy) {
        $this->column = $column;
        $this->orderBy = $orderBy;
    }

    public function generate(OrderByGenerator $generator) {
        return $generator->generateDescending($this);
    }
}