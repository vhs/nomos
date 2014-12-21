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

abstract class DomainCollection  {

    protected $__existing;
    protected $__new;
    protected $__removed;

    protected function clear() {
        $this->__existing = array();
        $this->__new = array();
        $this->__removed = array();
    }

    public function all() {
        return array_diff(array_merge($this->__existing, $this->__new), $this->__removed);
    }

    abstract public function compare(Domain $a, Domain $b);

    abstract public function contains(Domain $item);

    public function containsKey($key) {
        return array_key_exists($key, $this->all());
    }

    abstract public function add(Domain $item);

    abstract public function remove(Domain $item);

    abstract public function hydrate();

    abstract public function save();
}