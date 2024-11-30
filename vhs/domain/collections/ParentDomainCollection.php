<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 7:41 PM.
 */

namespace vhs\domain\collections;

use vhs\domain\Domain;

class ParentDomainCollection extends DomainCollection {
    public function add(Domain $item) {
        // TODO: Implement add() method.
        $this->raiseBeforeAdd();
        $this->raiseAdded();
    }

    public function all() {
        // TODO: Implement all() method.
    }

    public function compare(Domain $a, Domain $b) {
        // TODO: Implement compare() method.
    }

    public function contains(Domain $item) {
        // TODO: Implement contains() method.
    }

    public function containsKey($key) {
        // TODO: Implement containsKey() method.
    }

    public function hydrate() {
        // TODO: Implement hydrate() method.
    }

    public function remove(Domain $item) {
        // TODO: Implement remove() method.
        $this->raiseBeforeRemove();
        $this->raiseRemoved();
    }

    public function save() {
        // TODO: Implement save() method.
        $this->raiseBeforeSave();
        $this->raiseSaved();
    }
}
