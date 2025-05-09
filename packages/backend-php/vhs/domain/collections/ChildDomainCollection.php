<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 7:42 PM.
 */

namespace vhs\domain\collections;

use vhs\database\Column;
use vhs\database\constraints\ForeignKey;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\exceptions\DomainException;

/**
 * @template T of Domain
 *
 * @extends DomainCollection<T>
 *
 * @typescript
 */
class ChildDomainCollection extends DomainCollection {
    /**
     * childColumn.
     *
     * @var \vhs\database\Column
     */
    private $childColumn;

    /**
     * childKey.
     *
     * @var \vhs\database\constraints\PrimaryKey
     */
    private $childKey;

    /**
     * childType.
     *
     * @var mixed
     */
    private $childType;

    /**
     * parent.
     *
     * @var \vhs\domain\Domain<T>
     */
    private $parent;

    /**
     * parentColumn.
     *
     * @var Column $parentColumn
     */
    private $parentColumn;

    /**
     * __construct.
     *
     * @param \vhs\domain\Domain<T> $parent
     * @param mixed                 $childType
     *
     * @throws \vhs\domain\exceptions\DomainException
     */
    public function __construct(Domain $parent, $childType) {
        $this->parent = $parent;
        $this->childType = $childType;

        $pks = $childType::Schema()->PrimaryKeys();

        if (count($pks) != 1) {
            throw new DomainException(
                'Unsupported child relationship type. Only child tables having exactly one Primary Key are currently supported.'
            );
        }

        $this->childKey = $pks[0];

        $fks = $childType::Schema()->ForeignKeys();

        /** @var ForeignKey $fk */
        foreach ($fks as $fk) {
            if ($fk->table === $parent->Schema()->Table()) {
                $this->childColumn = $fk->column;
                $this->parentColumn = $fk->on;
            }
        }

        if (is_null($this->parentColumn) || is_null($this->childColumn)) {
            throw new DomainException('Child relationship incomplete - missing referenced child and/or parent column on joined tables');
        }

        // TODO something with before deletes - maybe not because this is a direct relationship

        $this->clear();
    }

    /**
     * add.
     *
     * @param \vhs\domain\Domain<T> $item
     *
     * @return void
     */
    public function add(Domain $item) {
        $this->raiseBeforeAdd();
        if ($this->contains($item)) {
            throw new DomainException('Item already exists in collection');
        }

        $childPkName = $this->childKey->column->name;
        $childColName = $this->childColumn->name;
        $parentColName = $this->parentColumn->name;

        if (array_key_exists($item->$childPkName, $this->__removed)) {
            unset($this->__removed[$item->$childPkName]);
        }

        $this->__new[$item->$childPkName] = $item;
        $item->$childColName = $this->parent->$parentColName;

        $this->raiseAdded();
    }

    /**
     * all.
     *
     * @return \vhs\domain\Domain<T>[]
     */
    public function all() {
        $childPkName = $this->childKey->column->name;

        $all = [];

        foreach (array_diff(array_merge($this->__existing, $this->__new), $this->__removed) as $item) {
            $all[$item->$childPkName] = $item;
        }

        return $all;
    }

    /**
     * clear.
     *
     * @return void
     */
    public function clear() {
        $this->__existing = [];
        $this->__new = [];
        $this->__removed = [];
    }

    /**
     * compare.
     *
     * @param \vhs\domain\Domain<T> $a
     * @param \vhs\domain\Domain<T> $b
     *
     * @return bool
     */
    public function compare(Domain $a, Domain $b) {
        $childPkName = $this->childKey->column->name;

        return $a->$childPkName === $b->$childPkName;
    }

    /**
     * contains.
     *
     * @param \vhs\domain\Domain<T> $item
     *
     * @return bool
     */
    public function contains(Domain $item) {
        $childPkName = $this->childKey->column->name;

        return $this->containsKey($item->$childPkName);
    }

    /**
     * hydrate.
     *
     * @return void
     */
    public function hydrate() {
        $this->clear();

        $child = $this->childType;
        $parentColName = $this->parentColumn->name;
        $childPkName = $this->childKey->column->name;

        $items = $child::where(Where::Equal($this->childColumn, $this->parent->$parentColName));

        foreach ($items as $item) {
            $this->__existing[$item->$childPkName] = $item;
        }
    }

    /**
     * remove.
     *
     * @param \vhs\domain\Domain<T> $item
     *
     * @return void
     */
    public function remove(Domain $item) {
        $this->raiseBeforeRemove();
        if ($this->contains($item)) {
            $childPkName = $this->childKey->column->name;
            $childColName = $this->childColumn->name;

            if (array_key_exists($item->$childPkName, $this->__new)) {
                unset($this->__new[$item->$childPkName]);
            }

            $this->__removed[$item->$childPkName] = $item;

            $item->$childColName = $this->childColumn->type->default;

            $this->raiseRemoved();
        }
    }

    /**
     * save.
     *
     * @return void
     */
    public function save() {
        $this->raiseBeforeSave();

        $actualNew = array_diff($this->__new, $this->__removed, $this->__existing);
        $actualRemove = array_intersect($this->__removed, $this->__existing);

        $childColName = $this->childColumn->name;
        $parentColName = $this->parentColumn->name;

        foreach ($actualNew as $new) {
            $new->$childColName = $this->parent->$parentColName;
            $new->save();
        }

        foreach ($actualRemove as $remove) {
            if ($this->childColumn->type->nullable) {
                $remove->save();
            }
            //when we first removed them this column value should've been set to the default value (NULL)
            else {
                $remove->delete();
            }
        }

        $this->raiseSaved();
    }
}
