<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:54 PM
 */

namespace vhs\database;

class WhereComparator extends Where {

    public $isArray = false;
    public $equal = true;
    public $greater = false;
    public $lesser = false;
    public $null_compare = false;
    public $column;
    public $value;

    public function __construct($column, $value, $null_compare, $equal, $greater, $lesser) {
        $this->column = $column;
        $this->value = $value;
        $this->null_compare = $null_compare;
        $this->equal = $equal;
        $this->greater = $greater;
        $this->lesser = $lesser;
        $this->isArray = is_array($value);
    }

    public function generate(WhereGenerator $generator) {
        return $generator->generateComparator($this);
    }
}
