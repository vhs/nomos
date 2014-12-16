<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:49 PM
 */

namespace vhs\database\queries;


use vhs\database\Columns;
use vhs\database\orders\OrderBy;
use vhs\database\Table;
use vhs\database\wheres\Where;

class QuerySelect extends Query {

    public $table;
    public $where;

    public function __construct(Table $table, Where $where = null, Columns $columns = null, OrderBy $orderBy = null, $limit = null) {
        parent::__construct($table, $where);

        $this->columns = $columns;
        $this->orderBy = $orderBy;
        $this->limit = $limit;
    }

    public function generateQuery(QueryGenerator $generator) {
        return $generator->generateSelect($this);
    }
}