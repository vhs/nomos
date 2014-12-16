<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 12:31 PM
 */

namespace vhs\database;


abstract class TableGenerator implements IGenerator {
    abstract public function generateTable(Table $ascending);
}