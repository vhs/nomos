<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 10:06 AM
 */
//TODO support extra properties on satellite table in DomainCollection
//TODO support other types of collections other than satellite joins

namespace vhs\domain\collections;


use vhs\domain\Domain;
use vhs\domain\Notifier;

abstract class DomainCollection extends Notifier  {

    protected $__existing;
    protected $__new;
    protected $__removed;

    public function clear() {
        $this->__existing = array();
        $this->__new = array();
        $this->__removed = array();
    }

    abstract public function all();

    abstract public function compare(Domain $a, Domain $b);

    abstract public function contains(Domain $item);

    public function containsKey($key) {
        return array_key_exists($key, $this->all());
    }

    abstract public function add(Domain $item);

    abstract public function remove(Domain $item);

    abstract public function hydrate();

    abstract public function save();

    public function onBeforeRemove(callable $listener) { $this->on("BeforeRemove", $listener); }
    protected function raiseBeforeRemove() { $this->raise("BeforeDelete"); }

    public function onRemoved(callable $listener) { $this->on("Removed", $listener); }
    protected function raiseRemoved() { $this->raise("Removed"); }

    public function onBeforeAdd(callable $listener) { $this->on("BeforeAdd", $listener); }
    protected function raiseBeforeAdd() { $this->raise("BeforeUpdate"); }

    public function onAdded(callable $listener) { $this->on("Added", $listener); }
    protected function raiseAdded() { $this->raise("Added"); }

    public function onBeforeSave(callable $listener) { $this->on("BeforeSave", $listener); }
    protected function raiseBeforeSave() { $this->raise("BeforeSave"); }

    public function onSaved(callable $listener) { $this->on("Saved", $listener); }
    protected function raiseSaved() { $this->raise("Saved"); }
}