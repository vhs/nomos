<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/8/2016
 * Time: 12:37 PM
 */

namespace app\security;


use vhs\database\access\IAccess;
use vhs\database\Column;
use vhs\database\Table;
use vhs\security\CurrentUser;

class PrivilegedAccess implements IAccess
{

    /** @var Column */
    protected $ownerColumn;
    /** @var IAccess[] */
    private $checks;

    public function __construct(Column $ownerColumn = null)
    {
        $this->ownerColumn = $ownerColumn;
        $this->checks = array();
    }

    public function Register(IAccess ...$checks) {
        $this->checks[] = $checks;
    }

    public function Table(Table $table, ...$privileges) {
        $this->Register(new TablePrivilegedAccess($this->ownerColumn, $table, ...$privileges));
    }

    public function Column(Column $column, ...$privileges) {
        $this->Register(new ColumnPrivilegedAccess($this->ownerColumn, $column, ...$privileges));
    }

    public function CanRead($record, Table $table, Column $column)
    {
        $access = false;
        foreach($this->checks as $check)
            $access &= $check->CanRead($record, $table, $column);

        return $access;
    }

    public function CanWrite($record, Table $table, Column $column)
    {
        $access = false;
        foreach($this->checks as $check)
            $access &= $check->CanWrite($record, $table, $column);

        return $access;
    }

    public function hasPrivilegedAccess($record, ...$privileges)
    {
        if (CurrentUser::hasAnyPermissions("administrator"))
            return true;

        if (in_array("owner", $privileges) && $this->IsOwner($record))
            return true;

        return CurrentUser::hasAnyPermissions($privileges);
    }

    public function IsOwner($record)
    {
        return (array_key_exists($this->ownerColumn->name, $record)) && $record[$this->ownerColumn->name] === CurrentUser::getIdentity();
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
