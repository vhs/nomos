<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/8/2016
 * Time: 12:08 PM
 */

namespace vhs\database\access;


use vhs\database\Column;
use vhs\database\Table;

class ColumnAccess extends Access
{

    /** @var Column */
    private $column;
    /** @var callable */
    private $check;

    public function __construct(Column $column, callable $check)
    {
        $this->column = $column;
        $this->check = $check;
    }

    public function CanRead($record, Table $table, Column $column)
    {
        $check = $this->check;
        if ($column === $this->column)
            return $check($record, $column);
    }

    public function CanWrite($record, Table $table, Column $column)
    {
        // TODO: Implement CanWrite() method.
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