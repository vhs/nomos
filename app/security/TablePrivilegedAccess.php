<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/8/2016
 * Time: 12:39 PM.
 */

namespace app\security;

use vhs\database\Column;
use vhs\database\Table;

/** @typescript */
class TablePrivilegedAccess extends PrivilegedAccess {
    /** @var string[] */
    private $privileges;

    /** @var \vhs\database\Table */
    private $table;

    /**
     * __construct.
     *
     * @param \vhs\database\Column|null $ownerColumn
     * @param \vhs\database\Table       $table
     * @param string                    ...$privileges
     *
     * @return void
     *
     * @phpstan-ignore parameter.requiredAfterOptional
     */
    public function __construct(?Column $ownerColumn = null, Table $table, ...$privileges) {
        parent::__construct($ownerColumn);
        $this->table = $table;
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
        return $table === $this->table && $this->hasPrivilegedAccess($record, ...$this->privileges);
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
        return $table === $this->table && $this->hasPrivilegedAccess($record, ...$this->privileges);
    }

    /**
     * jsonSerialize.
     *
     * @return mixed
     */
    public function jsonSerialize(): mixed {
        return [
            'type' => 'table',
            'table' => $this->table->name,
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
            'type' => 'table',
            'table' => $this->table->name,
            'privileges' => $this->privileges,
            'checks' => $this->checks
        ];
    }

    public function __unserialize($data): void {
        // TODO maybe implement?
    }
}
