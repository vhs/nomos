<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 2:52 PM
 */

namespace vhs\database;

use vhs\database\queries\Query;
use vhs\database\queries\QueryDelete;
use vhs\database\queries\QueryInsert;
use vhs\database\queries\QuerySelect;
use vhs\database\queries\QueryUpdate;
use vhs\database\queries\QueryCount;

interface IDataInterface {
    public static function DateFormat();

    public function scalar(QuerySelect $query);

    public function select(QuerySelect $query);

    public function delete(QueryDelete $query);

    public function insert(QueryInsert $query);

    public function update(QueryUpdate $query);

    public function count(QueryCount $query);

    public function exists(QuerySelect $query);

    public function arbitrary($command);
}
