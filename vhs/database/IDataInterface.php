<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 2:52 PM.
 */

namespace vhs\database;

use vhs\database\queries\Query;
use vhs\database\queries\QueryCount;
use vhs\database\queries\QueryDelete;
use vhs\database\queries\QueryInsert;
use vhs\database\queries\QuerySelect;
use vhs\database\queries\QueryUpdate;

/** @typescript */
interface IDataInterface {
    public static function DateFormat();

    public function arbitrary($command);

    public function count(QueryCount $query);

    public function delete(QueryDelete $query);

    public function exists(QuerySelect $query);

    public function insert(QueryInsert $query);

    public function scalar(QuerySelect $query);

    public function select(QuerySelect $query);

    public function update(QueryUpdate $query);
}
