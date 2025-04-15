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
    /**
     * DateFormat.
     *
     * @return string
     */
    public static function DateFormat();

    /**
     * arbitrary.
     *
     * @param mixed $command
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return mixed
     */
    public function arbitrary($command);

    /**
     * count.
     *
     * @param \vhs\database\queries\QueryCount $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return int|null
     */
    public function count(QueryCount $query);

    /**
     * delete.
     *
     * @param \vhs\database\queries\QueryDelete $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return bool
     */
    public function delete(QueryDelete $query);

    /**
     * exists.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return bool
     */
    public function exists(QuerySelect $query);

    /**
     * insert.
     *
     * @param \vhs\database\queries\QueryInsert $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return mixed
     */
    public function insert(QueryInsert $query);

    /**
     * scalar.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return mixed
     */
    public function scalar(QuerySelect $query);

    /**
     * select.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return mixed
     */
    public function select(QuerySelect $query);

    /**
     * update.
     *
     * @param \vhs\database\queries\QueryUpdate $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return mixed
     */
    public function update(QueryUpdate $query);
}
