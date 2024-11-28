<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:50 PM
 */

namespace vhs\database\queries;

use vhs\database\Columns;
use vhs\database\Table;
use vhs\database\wheres\Where;

class QueryUpdate extends Query {
    public $columns;
    public $values;

    public function __construct(Table $table, Columns $columns, Where $where = null, array $values) {
        parent::__construct($table, $where);

        $this->columns = $columns;
        $this->values = $values;
    }

    public function generateQuery(IQueryGenerator $generator) {
        return $generator->generateUpdate($this);
    }
}
