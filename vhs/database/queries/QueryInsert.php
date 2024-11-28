<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:46 PM
 */

namespace vhs\database\queries;

use vhs\database\Columns;
use vhs\database\Table;
use vhs\database\wheres\Where;

class QueryInsert extends Query {
    public $columns;
    public $values;

    public function __construct(Table $table, Columns $columns, array $values) {
        parent::__construct($table);

        $this->columns = $columns;
        $this->values = $values;
    }

    public function generateQuery(IQueryGenerator $generator) {
        return $generator->generateInsert($this);
    }
}
