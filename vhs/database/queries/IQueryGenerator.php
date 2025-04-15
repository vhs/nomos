<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:47 PM.
 */

namespace vhs\database\queries;

use vhs\database\IGenerator;

/** @typescript */
interface IQueryGenerator extends IGenerator {
    /**
     * generateDelete.
     *
     * @param \vhs\database\queries\QueryDelete $query
     *
     * @return mixed
     */
    public function generateDelete(QueryDelete $query);

    /**
     * generateInsert.
     *
     * @param \vhs\database\queries\QueryInsert $query
     *
     * @return mixed
     */
    public function generateInsert(QueryInsert $query);

    /**
     * generateSelect.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @return mixed
     */
    public function generateSelect(QuerySelect $query);

    /**
     * generateSelectCount.
     *
     * @param \vhs\database\queries\QueryCount $query
     *
     * @return mixed
     */
    public function generateSelectCount(QueryCount $query);

    /**
     * generateUpdate.
     *
     * @param \vhs\database\queries\QueryUpdate $query
     *
     * @return mixed
     */
    public function generateUpdate(QueryUpdate $query);
}
