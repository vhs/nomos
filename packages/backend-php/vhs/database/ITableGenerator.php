<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 12:31 PM.
 */

namespace vhs\database;

/** @typescript */
interface ITableGenerator extends IGenerator {
    /**
     * generateTable.
     *
     * @param \vhs\database\Table $table
     *
     * @return mixed
     */
    public function generateTable(Table $table);
}
