<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:47 PM
 */

namespace vhs\database\queries;


use vhs\database\IGenerator;

interface IQueryGenerator extends IGenerator {
    public function generateSelect(QuerySelect $query);
    public function generateInsert(QueryInsert $query);
    public function generateUpdate(QueryUpdate $query);
    public function generateDelete(QueryDelete $query);
    public function generateSelectCount(QueryCount $query);
}