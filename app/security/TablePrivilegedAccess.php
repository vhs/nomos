<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/8/2016
 * Time: 12:39 PM
 */

namespace app\security;


use vhs\database\Column;
use vhs\database\Table;
use vhs\security\CurrentUser;

class TablePrivilegedAccess extends PrivilegedAccess
{
    /** @var Table */
    private $table;
    /** @var string[] */
    private $privileges;

    public function __construct(Column $ownerColumn = null, Table $table, ...$privileges)
    {
        parent::__construct($ownerColumn);
        $this->table = $table;
        $this->privileges = $privileges;
    }

    public function CanRead($record, Table $table, Column $column)
    {
        return ($table === $this->table) && $this->hasPrivilegedAccess($record, ...$this->privileges);
    }

    public function CanWrite($record, Table $table, Column $column)
    {
        return ($table === $this->table) && $this->hasPrivilegedAccess($record, ...$this->privileges);
    }

    public function serialize()
    {
        return [
            "type" => "table",
            "table" => $this->table->name,
            "privileges" => $this->privileges,
            "checks" => $this->checks
        ];
    }

    public function jsonSerialize()
    {
        return [
            "type" => "table",
            "table" => $this->table->name,
            "privileges" => $this->privileges,
            "checks" => $this->checks
        ];
    }
}