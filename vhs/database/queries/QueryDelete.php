<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:50 PM
 */

namespace vhs\database\queries;

use vhs\database\Table;
use vhs\database\wheres\Where;

class QueryDelete extends Query {
    public function generateQuery(IQueryGenerator $generator) {
        return $generator->generateDelete($this);
    }
}
