<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/8/2016
 * Time: 12:43 PM
 */

namespace app\security;

use vhs\database\Column;
use vhs\database\Table;
use vhs\security\CurrentUser;

class ColumnPrivilegedAccess extends PrivilegedAccess {
    /** @var Column */
    private $column;
    /** @var string[] */
    private $privileges;

    public function __construct(Column $ownerColumn = null, Column $column, ...$privileges) {
        parent::__construct($ownerColumn);
        $this->column = $column;
        $this->privileges = $privileges;
    }

    public function CanRead($record, Table $table, Column $column) {
        return $column === $this->column && $this->hasPrivilegedAccess($record, ...$this->privileges);
    }

    public function CanWrite($record, Table $table, Column $column) {
        return $column === $this->column && $this->hasPrivilegedAccess($record, ...$this->privileges);
    }

    public function serialize() {
        return [
            'type' => 'column',
            'column' => [
                'table' => $this->column->table->name,
                'name' => $this->column->name,
                'type' => $this->column->type
            ],
            'privileges' => $this->privileges,
            'checks' => $this->checks
        ];
    }

    public function jsonSerialize() {
        return [
            'type' => 'column',
            'column' => [
                'table' => $this->column->table->name,
                'name' => $this->column->name,
                'type' => $this->column->type
            ],
            'privileges' => $this->privileges,
            'checks' => $this->checks
        ];
    }
}
