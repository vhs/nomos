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

    abstract public function all();

    abstract public function compare(Domain $a, Domain $b);

    abstract public function contains(Domain $item);

    abstract public function containsKey($key);

    abstract public function add(Domain $item);

    abstract public function remove(Domain $item);

    abstract public function hydrate();

    abstract public function save();
}