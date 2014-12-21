<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 7:38 PM
 */

namespace vhs\domain\collections;


use vhs\database\Columns;
use vhs\database\constraints\ForeignKey;
use vhs\database\Database;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\exceptions\DomainException;
use vhs\domain\Schema;

class SatelliteDomainCollection extends DomainCollection {
    private $parent;
    private $childType;
    private $joinTable;
    /** @var  ForeignKey */
    private $parentKey;
    /** @var  ForeignKey */
    private $childKey;

    public function __construct(Domain $parent, $childType, Schema $joinTable) {
        $this->parent = $parent;
        $this->childType = $childType;
        $this->joinTable = $joinTable;

        foreach($this->joinTable->ForeignKeys() as $fk) {
            if ($fk->table === $parent::Schema()->Table()) {
                $this->parentKey = $fk;
            }

            if($fk->table === $childType::Schema()->Table()) {
                $this->childKey = $fk;
            }
        }

        if(is_null($this->parentKey))
            throw new DomainException("Satellite does not contain foreign key relation to parent domain");

        if(is_null($this->parentKey))
            throw new DomainException("Satellite does not contain foreign key relation to child domain");

        $self = $this; //Cannot use $this as lexical variable
        $parent->onBeforeDelete(function() use ($self) {
            $parentOnCol = $self->parentKey->on->name;
            Database::delete($self->joinTable->Table(),
                Where::Equal($self->parentKey->column, $self->parent->$parentOnCol)
            );
        });

        $this->clear();
    }

    public function compare(Domain $a, Domain $b) {
        $childOnCol = $this->childKey->on->name;
        return ($a->$childOnCol === $b->$childOnCol);
    }

    public function contains(Domain $item) {
        $childOnCol = $this->childKey->on->name;
        return $this->containsKey($item->$childOnCol);
    }

    public function add(Domain $item) {
        if ($this->contains($item))
            throw new DomainException("Item already exists in collection");

        $childOnCol = $this->childKey->on->name;
        if (array_key_exists($item->$childOnCol, $this->__removed))
            unset($this->__removed[$item->$childOnCol]);

        $this->__new[$item->$childOnCol] = $item;
    }

    public function remove(Domain $item) {
        if ($this->contains($item)) {

            $childOnCol = $this->childKey->on->name;
            if (array_key_exists($item->$childOnCol, $this->__new))
                unset($this->__new[$item->$childOnCol]);

            $this->__removed[$item->$childOnCol] = $item;
        }
    }

    public function hydrate() {
        $this->clear();

        $parentOnCol = $this->parentKey->on->name;

        $rows = Database::select($this->joinTable->Table(), new Columns($this->childKey->column),
            Where::Equal($this->parentKey->column, $this->parent->$parentOnCol)
        );

        if(is_null($rows) || count($rows) <= 0) return;

        $childIds = array();
        foreach($rows as $row) {
            array_push($childIds, $row[$this->childKey->column->name]);
        }

        $childType = $this->childType;

        /** @var Domain $childType */
        $this->__existing = $childType::where(Where::In($this->childKey->on, $childIds));
    }

    public function save() {
        $actualNew = array_diff($this->__new, $this->__removed, $this->__existing);
        $actualRemove = array_diff($this->__removed, $this->__existing);

        $parentOnCol = $this->parentKey->on->name;
        $childOnCol = $this->childKey->on->name;
        $parentCol = $this->parentKey->column->name;
        $childCol = $this->childKey->column->name;


        if(count($actualNew) > 0) {
            foreach($actualNew as $item) {
                $data = array();

                $data[$parentCol] = $this->parent->$parentOnCol;
                $data[$childCol] = $item->$childOnCol;

                Database::create($this->joinTable->Table(), $data);
            }
        }

        if(count($actualRemove) > 0) {
            Database::delete($this->joinTable->Table(),
                Where::In($childCol, array_keys($actualRemove))
            );
        }
    }
}