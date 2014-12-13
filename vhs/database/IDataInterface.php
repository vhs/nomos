<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 2:52 PM
 */

namespace vhs\database;

interface IDataInterface {
    //TODO support joins some how
    public function scalar($table, $column, Where $where = null);
    public function select($table, $columns, Where $where = null);
    public function delete($table, Where $where = null);
    public function create($table, $data);
    public function update($table, $data, Where $where = null);
    public function count($table, Where $where = null);
    public function exists($table, Where $where = null);
    public function arbitrary($command);
}
