<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:16 PM.
 */

namespace vhs\database;

use vhs\database\types\Type;

/** @typescript */
class Column extends Element implements \Serializable, \JsonSerializable {
    /**
     * name.
     *
     * @var string
     */
    public $name;

    /**
     * serializable.
     *
     * @var bool
     */
    public $serializable;

    /**
     * table.
     *
     * @var \vhs\database\Table
     */
    public $table;

    /**
     * type.
     *
     * @var \vhs\database\types\Type
     */
    public $type;

    /**
     * __construct.
     *
     * @param \vhs\database\Table      $table
     * @param string                   $name
     * @param \vhs\database\types\Type $type
     * @param ?bool                    $serializable
     *
     * @return void
     */
    public function __construct(Table &$table, $name, Type $type, $serializable = true) {
        $this->table = $table;
        $this->name = $name;
        $this->type = $type;
        $this->serializable = $serializable;
    }

    /**
     * @param \vhs\database\IGenerator $generator
     * @param mixed|null               $value
     *
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var IColumnGenerator $generator */
        return $this->generateColumn($generator);
    }

    /**
     * generateColumn.
     *
     * @param \vhs\database\IColumnGenerator $generator
     *
     * @return string
     */
    public function generateColumn(IColumnGenerator $generator) {
        return $generator->generateColumn($this);
    }

    /**
     * getAbsoluteName.
     *
     * @return string
     */
    public function getAbsoluteName() {
        return $this->table->name . '.' . $this->name;
    }

    /**
     * Specify data which should be serialized to JSON.
     *
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     *
     * @return string data which can be serialized by <b>json_encode</b>,
     *                which is a value of any type other than a resource
     *
     * @since 5.4.0
     */
    public function jsonSerialize(): string {
        return $this->table->name . '.' . $this->name . '::' . get_class($this->type);
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
    public function serialize(): string {
        return $this->table->name . '.' . $this->name . '::' . get_class($this->type);
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
    public function unserialize($serialized): void {
        // TODO: Implement unserialize() method.
    }

    /**
     * __clone.
     *
     * @return void
     */
    public function __clone() {
        $this->type = clone $this->type;
    }

    /**
     * __serialize.
     *
     * @return string
     */
    public function __serialize() {
        // @phpstan-ignore return.type
        return $this->serialize();
    }

    /**
     * __unserialize.
     *
     * @param mixed $data
     *
     * @return void
     */
    public function __unserialize($data): void {
        // TODO: Implement __unserialize() method.
    }

    /**
     * __updateTable.
     *
     * @param \vhs\database\Table $table
     *
     * @return void
     */
    public function __updateTable(Table &$table) {
        $this->table = $table;
    }
}
