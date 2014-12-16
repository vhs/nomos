<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 2:52 PM
 */

namespace vhs\database;

use vhs\database\orders\OrderBy;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;

interface IDataInterface {
    //TODO support joins some how
    public function scalar(Table $table, Column $column, Where $where = null, OrderBy $orderBy = null, $limit = null);
    public function select(Table $table, Columns $columns, Where $where = null, OrderBy $orderBy = null, $limit = null);
    public function delete(Table $table, Where $where = null);
    public function create(Table $table, $data);
    public function update(Table $table, $data, Where $where = null);
    public function count(Table $table, Where $where = null, OrderBy $orderBy = null, $limit = null);
    public function exists(Table $table, Where $where = null, OrderBy $orderBy = null, $limit = null);
    public function query(Query $query);
    public function arbitrary($command);
}
