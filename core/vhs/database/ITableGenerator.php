<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 12:31 PM
 */

namespace vhs\database;


interface ITableGenerator extends IGenerator {
    public function generateTable(Table $ascending);
}