<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/8/2016
 * Time: 12:18 PM
 */

namespace vhs\database\access;


use vhs\database\Column;
use vhs\database\Table;

class TableAccess extends Access
{
    /** @var Table */
    private $table;
    /** @var callable */
    private $check;

    public function __construct(Table $table, callable $check)
    {
        $this->table = $table;
        $this->check = $check;
    }

    public function CanRead($record, Table $table, Column $column)
    {
        $check = $this->check;
        return ($table === $this->table) && $check($record, $table, $column);
    }

    public function CanWrite($record, Table $table, Column $column)
    {
        $check = $this->check;
        return ($table === $this->table) && $check($record, $table, $column);
    }

    /**
     * String representation of object
     * @link http://php.net/manual/en/serializable.serialize.php
     * @return string the string representation of the object or null
     * @since 5.1.0
     */
    public function serialize()
    {
        // TODO: Implement serialize() method.
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
    public function unserialize($serialized)
    {
        // TODO: Implement unserialize() method.
    }
}