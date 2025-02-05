<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/8/2016
 * Time: 12:37 PM.
 */

namespace app\security;

use vhs\database\access\IAccess;
use vhs\database\Column;
use vhs\database\Table;
use vhs\security\CurrentUser;

/** @typescript */
class PrivilegedAccess implements IAccess {
    /** @var IAccess[] */
    protected $checks;
    /** @var Column */
    protected $ownerColumn;

    public function __construct(Column $ownerColumn = null) {
        $this->ownerColumn = $ownerColumn;
        $this->checks = [];
    }

    public static function GenerateAccess($key, Table $table, Column $ownerColumn = null) {
        $access = null;
        $child = null;

        if (is_null($ownerColumn)) {
            $access = new TablePrivilegedAccess(null, $table, 'access:' . $key);
            $child = $access;
        } else {
            $access = new PrivilegedAccess($ownerColumn);
            $child = $access->Table($table, 'access:' . $key);
        }
        foreach ($table->columns->all() as $column) {
            $child->Column($column, 'access:' . $key, 'access:' . $key . ':' . $column->name);
        }

        return $access;
    }

    public function CanRead($record, Table $table, Column $column) {
        $access = false;
        foreach ($this->checks as $check) {
            $access &= $check->CanRead($record, $table, $column);
        }

        return $access;
    }

    public function CanWrite($record, Table $table, Column $column) {
        $access = false;
        foreach ($this->checks as $check) {
            $access &= $check->CanWrite($record, $table, $column);
        }

        return $access;
    }

    public function Column(Column $column, ...$privileges) {
        $access = new ColumnPrivilegedAccess($this->ownerColumn, $column, ...$privileges);
        $this->Register($access);

        return $access;
    }

    public function hasPrivilegedAccess($record, ...$privileges) {
        if (CurrentUser::hasAnyPermissions('administrator')) {
            return true;
        }

        if (in_array('owner', $privileges) && $this->IsOwner($record)) {
            return true;
        }

        return CurrentUser::hasAnyPermissions($privileges);
    }

    public function IsOwner($record) {
        return array_key_exists($this->ownerColumn->name, $record) && $record[$this->ownerColumn->name] === CurrentUser::getIdentity();
    }

    /**
     * Specify data which should be serialized to JSON.
     *
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     *
     * @return mixed data which can be serialized by <b>json_encode</b>,
     *               which is a value of any type other than a resource
     *
     * @since 5.4.0
     */
    public function jsonSerialize(): mixed {
        return [
            'type' => 'ownership',
            'ownership' => [
                'table' => $this->ownerColumn->table->name,
                'name' => $this->ownerColumn->name,
                'type' => $this->ownerColumn->type
            ],
            'checks' => $this->checks
        ];
    }

    public function Register(IAccess ...$checks) {
        foreach ($checks as $check) {
            array_push($this->checks, $check);
        }
    }

    /**
     * String representation of object.
     *
     * @link http://php.net/manual/en/serializable.serialize.php
     *
     * @return string the string representation of the object or null
     *
     * @since 5.1.0
     */
    public function serialize(): mixed {
        return [
            'type' => 'ownership',
            'ownership' => [
                'table' => $this->ownerColumn->table->name,
                'name' => $this->ownerColumn->name,
                'type' => $this->ownerColumn->type
            ],
            'checks' => $this->checks
        ];
    }

    public function Table(Table $table, ...$privileges) {
        $access = new TablePrivilegedAccess($this->ownerColumn, $table, ...$privileges);
        $this->Register($access);

        return $access;
    }

    /**
     * Constructs the object.
     *
     * @link http://php.net/manual/en/serializable.unserialize.php
     *
     * @param string $serialized <p>
     *                           The string representation of the object.
     *                           </p>
     *
     * @return void
     *
     * @since 5.1.0
     */
    public function unserialize($serialized) {
        // TODO: Implement unserialize() method.
    }

    public function __serialize() {
        return $this->serialize();
    }

    public function __unserialize($data): void {
        // TODO: Implement __unserialize() method.
    }
}
