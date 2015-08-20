<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:45 PM
 */

namespace vhs\database\queries;

use vhs\database\Columns;
use vhs\database\IGeneratable;
use vhs\database\IGenerator;
use vhs\database\joins\Join;
use vhs\database\joins\JoinCross;
use vhs\database\joins\JoinInner;
use vhs\database\limits\Limit;
use vhs\database\offsets\Offset;
use vhs\database\orders\OrderBy;
use vhs\database\Table;
use vhs\database\wheres\Where;

abstract class Query implements IGeneratable {

    /** @var Table */
    public $table;
    /** @var Where */
    public $where;

    /** @var array */
    public $joins;

    public function __construct(Table $table, Where $where = null) {
        $this->table = $table;
        $this->where = $where;
    }

    public static function Select(Table $table, Columns $columns = null, Where $where = null, OrderBy $orderBy = null, Limit $limit = null, Offset $offset = null) {
        return new QuerySelect($table, $columns, $where, $orderBy, $limit, $offset);
    }

    public static function Insert(Table $table, Columns $columns, array $values) {
        return new QueryInsert($table, $columns, $values);
    }

    public static function Update(Table $table, Columns $columns, Where $where = null, array $values) {
        return new QueryUpdate($table, $columns, $where, $values);
    }

    public static function Delete(Table $table, Where $where = null) {
        return new QueryDelete($table, $where);
    }

    public function Join(Join ...$join) {

        if (is_null($this->joins))
            $this->joins = array();

        array_push($this->joins, ...$join);

        return $this;
    }

    /**
     * @param IGenerator $generator
     * @param null $value
     * @return mixed
     */
    function generate(IGenerator $generator, $value = null) {
        /** @var IQueryGenerator $generator */
        return $this->generateQuery($generator);
    }

    abstract public function generateQuery(IQueryGenerator $generator);
}