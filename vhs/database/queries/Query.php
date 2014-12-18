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
use vhs\database\orders\OrderBy;
use vhs\database\Table;
use vhs\database\wheres\Where;

abstract class Query implements IGeneratable {

    public $table;
    public $where;

    public function __construct(Table $table, Where $where) {
        $this->table = $table;
        $this->where = $where;
    }

    public static function Select(Table $table, Where $where = null, Columns $columns = null, OrderBy $orderBy = null, $limit = null) {
        return new QuerySelect($table, $where, $columns, $orderBy, $limit);
    }

    public static function Insert(Table $table, Where $where = null, Columns $columns, array $values) {
        return new QueryInsert($table, $where, $columns, $values);
    }

    public static function Update(Table $table, Where $where = null, Columns $columns, array $values) {
        return new QueryUpdate($table, $where, $columns, $values);
    }

    public static function Delete(Table $table, Where $where = null) {
        return new QueryDelete($table, $where);
    }

    /**
     * @param IGenerator $generator
     * @return mixed
     */
    function generate(IGenerator $generator) {
        /** @var IQueryGenerator $generator */
        return $this->generateQuery($generator);
    }

    abstract public function generateQuery(IQueryGenerator $generator);
}