<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:49 PM
 */

namespace vhs\database\queries;

use vhs\database\Columns;
use vhs\database\limits\Limit;
use vhs\database\offsets\Offset;
use vhs\database\orders\OrderBy;
use vhs\database\Table;
use vhs\database\wheres\Where;

class QueryCount extends Query {
    /** @var Columns  */
    public $columns;
    /** @var Limit  */
    public $limit;
    /** @var Offset  */
    public $offset;
    /** @var OrderBy  */
    public $orderBy;

    public function __construct(Table $table, Where $where = null, OrderBy $orderBy = null, Limit $limit = null, Offset $offset = null) {
        parent::__construct($table, $where);

        $this->orderBy = $orderBy;
        $this->limit = $limit;
        $this->offset = $offset;
    }

    public function generateQuery(IQueryGenerator $generator) {
        return $generator->generateSelectCount($this);
    }
}
