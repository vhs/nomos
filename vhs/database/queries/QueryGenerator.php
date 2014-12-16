<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:47 PM
 */

namespace vhs\database\queries;


use vhs\database\IGenerator;

abstract class QueryGenerator implements IGenerator {
    abstract public function generateSelect(QuerySelect $query);
    abstract public function generateInsert(QueryInsert $query);
    abstract public function generateUpdate(QueryUpdate $query);
    abstract public function generateDelete(QueryDelete $query);
}