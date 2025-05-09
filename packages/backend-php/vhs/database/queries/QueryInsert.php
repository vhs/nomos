<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:46 PM.
 */

namespace vhs\database\queries;

use vhs\database\Columns;
use vhs\database\Table;

/** @typescript */
class QueryInsert extends Query {
    /** @var Columns */
    public $columns;
    /** @var mixed */
    public $values;

    /**
     * constructor.
     *
     * @param Table   $table
     * @param Columns $columns
     * @param mixed   $values
     */
    public function __construct(Table $table, Columns $columns, $values = null) {
        parent::__construct($table);

        $this->columns = $columns;
        $this->values = $values;
    }

    public function generateQuery(IQueryGenerator $generator) {
        return $generator->generateInsert($this);
    }
}
