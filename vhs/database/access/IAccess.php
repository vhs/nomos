<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/8/2016
 * Time: 12:56 PM.
 */

namespace vhs\database\access;

use vhs\database\Column;
use vhs\database\Table;

/** @typescript */
interface IAccess extends \Serializable, \JsonSerializable {
    public function CanRead($record, Table $table, Column $column);

    public function CanWrite($record, Table $table, Column $column);
}
