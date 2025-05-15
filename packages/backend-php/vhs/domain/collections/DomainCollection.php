<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 10:06 AM.
 */
// TODO support extra properties on satellite table in DomainCollection
// TODO support other types of collections other than satellite joins

namespace vhs\domain\collections;

use vhs\domain\Domain;
use vhs\domain\Notifier;

/**
 * @template T of Domain
 *
 * @typescript
 */
abstract class DomainCollection extends Notifier {
    /**
     * __existing.
     *
     * @var mixed
     */
    protected $__existing;

    /**
     * __new.
     *
     * @var mixed
     */
    protected $__new;

    /**
     * __removed.
     *
     * @var mixed
     */
    protected $__removed;

    /**
     * add.
     *
     * @param \vhs\domain\Domain<T> $item
     *
     * @return void
     */
    abstract public function add(Domain $item);

    /**
     * all.
     *
     * @return \vhs\domain\Domain<T>[]
     */
    abstract public function all();

    /**
     * compare.
     *
     * @param \vhs\domain\Domain<T> $a
     * @param \vhs\domain\Domain<T> $b
     *
     * @return bool
     */
    abstract public function compare(Domain $a, Domain $b);

    /**
     * contains.
     *
     * @param \vhs\domain\Domain<T> $item
     *
     * @return bool
     */
    abstract public function contains(Domain $item);

    /**
     * hydrate.
     *
     * @return void
     */
    abstract public function hydrate();

    /**
     * remove.
     *
     * @param \vhs\domain\Domain<T> $item
     *
     * @return void
     */
    abstract public function remove(Domain $item);

    /**
     * save.
     *
     * @return void
     */
    abstract public function save();

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
     * containsKey.
     *
     * @param string $key
     *
     * @return bool
     */
    public function containsKey($key) {
        return array_key_exists($key, $this->all());
    }

    /**
     * onAdded.
     *
     * @param callable $listener
     *
     * @return void
     */
    public function onAdded(callable $listener) {
        $this->on('Added', $listener);
    }

    /**
     * onBeforeAdd.
     *
     * @param callable $listener
     *
     * @return void
     */
    public function onBeforeAdd(callable $listener) {
        $this->on('BeforeAdd', $listener);
    }

    /**
     * onBeforeRemove.
     *
     * @param callable $listener
     *
     * @return void
     */
    public function onBeforeRemove(callable $listener) {
        $this->on('BeforeRemove', $listener);
    }

    /**
     * onBeforeSave.
     *
     * @param callable $listener
     *
     * @return void
     */
    public function onBeforeSave(callable $listener) {
        $this->on('BeforeSave', $listener);
    }

    /**
     * onRemoved.
     *
     * @param callable $listener
     *
     * @return void
     */
    public function onRemoved(callable $listener) {
        $this->on('Removed', $listener);
    }

    /**
     * onSaved.
     *
     * @param callable $listener
     *
     * @return void
     */
    public function onSaved(callable $listener) {
        $this->on('Saved', $listener);
    }

    /**
     * raiseAdded.
     *
     * @return void
     */
    protected function raiseAdded() {
        $this->raise('Added');
    }

    /**
     * raiseBeforeAdd.
     *
     * @return void
     */
    protected function raiseBeforeAdd() {
        $this->raise('BeforeUpdate');
    }

    /**
     * raiseBeforeRemove.
     *
     * @return void
     */
    protected function raiseBeforeRemove() {
        $this->raise('BeforeDelete');
    }

    /**
     * raiseBeforeSave.
     *
     * @return void
     */
    protected function raiseBeforeSave() {
        $this->raise('BeforeSave');
    }

    /**
     * raiseRemoved.
     *
     * @return void
     */
    protected function raiseRemoved() {
        $this->raise('Removed');
    }

    /**
     * raiseSaved.
     *
     * @return void
     */
    protected function raiseSaved() {
        $this->raise('Saved');
    }
}
