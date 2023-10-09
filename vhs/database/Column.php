<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:16 PM
 */

namespace vhs\database;

use vhs\database\types\Type;

class Column extends Element implements \Serializable, \JsonSerializable {
    public $table;
    public $name;
    public $type;
    public $serializable;

    public function __construct(Table &$table, $name, Type $type, $serializable = true) {
        $this->table = $table;
        $this->name = $name;
        $this->type = $type;
        $this->serializable = $serializable;
    }

    public function __clone() {
        $this->type = clone $this->type;
    }

    public function __updateTable(Table &$table) {
        $this->table = $table;
    }

    public function getAbsoluteName() {
        return $this->table->name . '.' . $this->name;
    }

    /**
     * @param IGenerator $generator
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var IColumnGenerator $generator */
        return $this->generateColumn($generator);
    }

    public function generateColumn(IColumnGenerator $generator) {
        return $generator->generateColumn($this);
    }

    /**
     * String representation of object
     * @link http://php.net/manual/en/serializable.serialize.php
     * @return string the string representation of the object or null
     * @since 5.1.0
     */
    public function serialize() {
        return $this->table->name . '.' . $this->name . '::' . get_class($this->type);
    }

    /**
     * Constructs the object
     * @link http://php.net/manual/en/serializable.unserialize.php
     * @param string $serialized <p>
     * The string representation of the object.
     * </p>
     * @return void
     * @since 5.1.0
     */
    public function unserialize($serialized) {
        // TODO: Implement unserialize() method.
    }

    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize() {
        return $this->table->name . '.' . $this->name . '::' . get_class($this->type);
    }
}
