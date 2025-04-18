<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 7:38 PM.
 */

namespace vhs\domain\collections;

use vhs\database\Columns;
use vhs\database\Database;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\exceptions\DomainException;
use vhs\domain\Schema;

/** @typescript */
class SatelliteDomainCollection extends DomainCollection {
    /**
     * childKey.
     *
     * @var \vhs\database\constraints\ForeignKey
     */
    private $childKey;

    /**
     * childType.
     *
     * @var mixed
     */
    private $childType;

    /**
     * joinTable.
     *
     * @var \vhs\domain\Schema
     */
    private $joinTable;

    /**
     * parent.
     *
     * @var \vhs\domain\Domain
     */
    private $parent;

    /**
     * parentKey.
     *
     * @var \vhs\database\constraints\ForeignKey
     */
    private $parentKey;

    /**
     * __construct.
     *
     * @param \vhs\domain\Domain $parent
     * @param mixed              $childType
     * @param \vhs\domain\Schema $joinTable
     *
     * @throws \vhs\domain\exceptions\DomainException
     *
     * @return void
     */
    public function __construct(Domain $parent, $childType, Schema $joinTable) {
        $this->parent = $parent;
        $this->childType = $childType;
        $this->joinTable = $joinTable;

        foreach ($this->joinTable->ForeignKeys() as $fk) {
            if ($fk->table === $parent::Schema()->Table()) {
                $this->parentKey = $fk;
            }

            if ($fk->table === $childType::Schema()->Table()) {
                $this->childKey = $fk;
            }
        }

        if (is_null($this->parentKey)) {
            throw new DomainException('Satellite does not contain foreign key relation to parent domain');
        }

        if (is_null($this->parentKey)) {
            throw new DomainException('Satellite does not contain foreign key relation to child domain');
        }

        $self = $this; //Cannot use $this as lexical variable
        $parent->onBeforeDelete(function () use ($self) {
            $parentOnCol = $self->parentKey->on->name;
            Database::delete(Query::Delete($self->joinTable->Table(), Where::Equal($self->parentKey->column, $self->parent->$parentOnCol)));
        });

        $this->clear();
    }

    /**
     * add.
     *
     * @param \vhs\domain\Domain $item
     *
     * @throws \vhs\domain\exceptions\DomainException
     *
     * @return void
     */
    public function add(Domain $item) {
        $this->raiseBeforeAdd();

        if ($this->contains($item)) {
            throw new DomainException('Item already exists in collection');
        }

        $childOnCol = $this->childKey->on->name;
        if (array_key_exists($item->$childOnCol, $this->__removed)) {
            unset($this->__removed[$item->$childOnCol]);
        }

        $this->__new[$item->$childOnCol] = $item;

        $this->raiseAdded();
    }

    /**
     * all.
     *
     * @return string[]
     */
    public function all() {
        $childOnCol = $this->childKey->on->name;

        $all = [];

        foreach (array_diff(array_merge($this->__existing, $this->__new), $this->__removed) as $item) {
            $all[$item->$childOnCol] = $item;
        }

        return $all;
    }

    /**
     * compare.
     *
     * @param \vhs\domain\Domain $a
     * @param \vhs\domain\Domain $b
     *
     * @return bool
     */
    public function compare(Domain $a, Domain $b) {
        $childOnCol = $this->childKey->on->name;

        return $a->$childOnCol === $b->$childOnCol;
    }

    /**
     * contains.
     *
     * @param \vhs\domain\Domain $item
     *
     * @return bool
     */
    public function contains(Domain $item) {
        $childOnCol = $this->childKey->on->name;

        return $this->containsKey($item->$childOnCol);
    }

    /**
     * hydrate.
     *
     * @return void
     */
    public function hydrate() {
        $this->clear();

        $parentOnCol = $this->parentKey->on->name;

        $rows = Database::select(
            Query::Select(
                $this->joinTable->Table(),
                new Columns($this->childKey->column),
                Where::Equal($this->parentKey->column, $this->parent->$parentOnCol)
            )
        );

        if (is_null($rows) || count($rows) <= 0) {
            return;
        }

        $childIds = [];
        foreach ($rows as $row) {
            array_push($childIds, $row[$this->childKey->column->name]);
        }

        $childType = $this->childType;

        /** @var Domain $childType */
        $this->__existing = $childType::where(Where::In($this->childKey->on, $childIds));
    }

    /**
     * remove.
     *
     * @param \vhs\domain\Domain $item
     *
     * @return void
     */
    public function remove(Domain $item) {
        $this->raiseBeforeRemove();
        if ($this->contains($item)) {
            $childOnCol = $this->childKey->on->name;
            if (array_key_exists($item->$childOnCol, $this->__new)) {
                unset($this->__new[$item->$childOnCol]);
            }

            $this->__removed[$item->$childOnCol] = $item;

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

        $parentOnCol = $this->parentKey->on->name;
        $childOnCol = $this->childKey->on->name;
        $parentCol = $this->parentKey->column->name;
        $childCol = $this->childKey->column->name;

        if (count($actualNew) > 0) {
            foreach ($actualNew as $item) {
                $data = [];

                $data[$parentCol] = $this->parent->$parentOnCol;
                $data[$childCol] = $item->$childOnCol;

                Database::insert(Query::Insert($this->joinTable->Table(), $this->joinTable->Columns(), $data));
            }
        }

        if (count($actualRemove) > 0) {
            Database::delete(
                Query::Delete(
                    $this->joinTable->Table(),
                    Where::_And(
                        Where::Equal($this->parentKey->column, $this->parent->$parentOnCol),
                        Where::In($this->childKey->column, array_keys($actualRemove))
                    )
                )
            );
        }

        $this->raiseSaved();
    }
}
