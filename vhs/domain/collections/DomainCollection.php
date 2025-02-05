<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 10:06 AM.
 */
//TODO support extra properties on satellite table in DomainCollection
//TODO support other types of collections other than satellite joins

namespace vhs\domain\collections;

use vhs\domain\Domain;
use vhs\domain\Notifier;

/** @typescript */
abstract class DomainCollection extends Notifier {
    protected $__existing;
    protected $__new;
    protected $__removed;

    abstract public function add(Domain $item);

    abstract public function all();

    abstract public function compare(Domain $a, Domain $b);

    abstract public function contains(Domain $item);

    abstract public function hydrate();

    abstract public function remove(Domain $item);

    abstract public function save();

    public function clear() {
        $this->__existing = [];
        $this->__new = [];
        $this->__removed = [];
    }

    public function containsKey($key) {
        return array_key_exists($key, $this->all());
    }

    public function onAdded(callable $listener) {
        $this->on('Added', $listener);
    }

    public function onBeforeAdd(callable $listener) {
        $this->on('BeforeAdd', $listener);
    }

    public function onBeforeRemove(callable $listener) {
        $this->on('BeforeRemove', $listener);
    }

    public function onBeforeSave(callable $listener) {
        $this->on('BeforeSave', $listener);
    }

    public function onRemoved(callable $listener) {
        $this->on('Removed', $listener);
    }

    public function onSaved(callable $listener) {
        $this->on('Saved', $listener);
    }

    protected function raiseAdded() {
        $this->raise('Added');
    }

    protected function raiseBeforeAdd() {
        $this->raise('BeforeUpdate');
    }

    protected function raiseBeforeRemove() {
        $this->raise('BeforeDelete');
    }

    protected function raiseBeforeSave() {
        $this->raise('BeforeSave');
    }

    protected function raiseRemoved() {
        $this->raise('Removed');
    }

    protected function raiseSaved() {
        $this->raise('Saved');
    }
}
