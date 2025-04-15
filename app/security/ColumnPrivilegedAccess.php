<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/8/2016
 * Time: 12:43 PM.
 */

namespace app\security;

use vhs\database\Column;
use vhs\database\Table;

/** @typescript */
class ColumnPrivilegedAccess extends PrivilegedAccess {
    /** @var Column */
    private $column;

    /** @var string[] */
    private $privileges = [];

    /**
     * __construct.
     *
     * @param \vhs\database\Column|null $ownerColumn
     * @param \vhs\database\Column      $column
     * @param string                    ...$privileges
     *
     * @return void
     *
     * @phpstan-ignore parameter.requiredAfterOptional
     */
    public function __construct(?Column $ownerColumn = null, Column $column, ...$privileges) {
        parent::__construct($ownerColumn);
        $this->column = $column;
        $this->privileges = $privileges;
    }

    /**
     * CanRead.
     *
     * @param mixed                $record
     * @param \vhs\database\Table  $table
     * @param \vhs\database\Column $column
     *
     * @return bool
     */
    public function CanRead($record, Table $table, Column $column) {
        return $column === $this->column && $this->hasPrivilegedAccess($record, ...$this->privileges);
    }

    /**
     * CanWrite.
     *
     * @param mixed                $record
     * @param \vhs\database\Table  $table
     * @param \vhs\database\Column $column
     *
     * @return bool
     */
    public function CanWrite($record, Table $table, Column $column) {
        return $column === $this->column && $this->hasPrivilegedAccess($record, ...$this->privileges);
    }

    /**
     * jsonSerialize.
     *
     * @return mixed
     */
    public function jsonSerialize(): mixed {
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

    /**
     * serialize.
     *
     * @return string
     */
    public function serialize(): string {
        return json_encode($this->__serialize());
    }

    /**
     * __serialize.
     *
     * @return array<string,mixed>
     */
    public function __serialize() {
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

    /**
     * __unserialize.
     *
     * @param mixed $data
     *
     * @return void
     */
    public function __unserialize($data): void {
        // TODO maybe implement?
    }
}
