<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:45 PM.
 */

namespace vhs\database\queries;

use vhs\database\Columns;
use vhs\database\IGeneratable;
use vhs\database\IGenerator;
use vhs\database\joins\Join;
use vhs\database\limits\Limit;
use vhs\database\offsets\Offset;
use vhs\database\orders\OrderBy;
use vhs\database\Table;
use vhs\database\wheres\Where;

/** @typescript */
abstract class Query implements IGeneratable {
    /** @var \vhs\database\joins\Join[]|null */
    public array|null $joins = null;

    /** @var \vhs\database\Table */
    public $table;

    /** @var \vhs\database\wheres\Where */
    public $where;

    /**
     * __construct.
     *
     * @param \vhs\database\Table        $table
     * @param \vhs\database\wheres\Where $where
     *
     * @return void
     */
    public function __construct(Table $table, ?Where $where = null) {
        $this->table = $table;
        $this->where = $where;
    }

    /**
     * Count.
     *
     * @param \vhs\database\Table               $table
     * @param \vhs\database\wheres\Where|null   $where
     * @param \vhs\database\orders\OrderBy|null $orderBy
     * @param \vhs\database\limits\Limit|null   $limit
     * @param \vhs\database\offsets\Offset|null $offset
     *
     * @return \vhs\database\queries\QueryCount
     */
    public static function Count(Table $table, ?Where $where = null, ?OrderBy $orderBy = null, ?Limit $limit = null, ?Offset $offset = null) {
        return new QueryCount($table, $where, $orderBy, $limit, $offset);
    }

    /**
     * Delete.
     *
     * @param \vhs\database\Table             $table
     * @param \vhs\database\wheres\Where|null $where
     *
     * @return \vhs\database\queries\QueryDelete
     */
    public static function Delete(Table $table, ?Where $where = null) {
        return new QueryDelete($table, $where);
    }

    /**
     * Insert.
     *
     * @param \vhs\database\Table   $table
     * @param \vhs\database\Columns $columns
     * @param mixed[]               $values
     *
     * @return \vhs\database\queries\QueryInsert
     */
    public static function Insert(Table $table, Columns $columns, array $values) {
        return new QueryInsert($table, $columns, $values);
    }

    /**
     * Select.
     *
     * @param \vhs\database\Table               $table
     * @param \vhs\database\Columns|null        $columns
     * @param \vhs\database\wheres\Where|null   $where
     * @param \vhs\database\orders\OrderBy|null $orderBy
     * @param \vhs\database\limits\Limit|null   $limit
     * @param \vhs\database\offsets\Offset|null $offset
     *
     * @return \vhs\database\queries\QuerySelect
     */
    public static function Select(
        Table $table,
        ?Columns $columns = null,
        ?Where $where = null,
        ?OrderBy $orderBy = null,
        ?Limit $limit = null,
        ?Offset $offset = null
    ) {
        return new QuerySelect($table, $columns, $where, $orderBy, $limit, $offset);
    }

    /**
     * Update.
     *
     * @param \vhs\database\Table             $table
     * @param \vhs\database\Columns           $columns
     * @param \vhs\database\wheres\Where|null $where
     * @param mixed[]                         $values
     *
     * @return \vhs\database\queries\QueryUpdate
     */
    public static function Update(Table $table, Columns $columns, Where $where = null, array $values) {
        return new QueryUpdate($table, $columns, $where, $values);
    }

    /**
     * generateQuery.
     *
     * @param \vhs\database\queries\IQueryGenerator $generator
     *
     * @return mixed
     */
    abstract public function generateQuery(IQueryGenerator $generator);

    /**
     * @param \vhs\database\IGenerator $generator
     * @param mixed                    $value
     *
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var IQueryGenerator $generator */
        return $this->generateQuery($generator);
    }

    /**
     * Join.
     *
     * @param \vhs\database\joins\Join ...$join
     *
     * @return self
     */
    public function Join(Join ...$join) {
        if (is_null($this->joins)) {
            $this->joins = [];
        }

        array_push($this->joins, ...$join);

        return $this;
    }
}
