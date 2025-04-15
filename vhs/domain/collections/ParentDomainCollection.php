<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 7:41 PM.
 */

namespace vhs\domain\collections;

use vhs\domain\Domain;

/** @typescript */
class ParentDomainCollection extends DomainCollection {
    /**
     * add.
     *
     * @param \vhs\domain\Domain $item
     *
     * @return void
     */
    public function add(Domain $item) {
        // TODO: Implement add() method.
        $this->raiseBeforeAdd();
        $this->raiseAdded();
    }

    /**
     * all.
     *
     * @return string[]
     */
    public function all() {
        // TODO: Implement all() method.
        return [];
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
        // TODO: Implement compare() method.

        return false;
    }

    /**
     * contains.
     *
     * @param \vhs\domain\Domain $item
     *
     * @return bool
     */
    public function contains(Domain $item) {
        // TODO: Implement contains() method.
        return false;
    }

    /**
     * containsKey.
     *
     * @param int $key
     *
     * @return bool
     *
     * @phpstan-ignore method.childParameterType
     */
    public function containsKey($key) {
        // TODO: Implement containsKey() method.
        return false;
    }

    /**
     * hydrate.
     *
     * @return void
     */
    public function hydrate() {
        // TODO: Implement hydrate() method.
    }

    /**
     * remove.
     *
     * @param \vhs\domain\Domain $item
     *
     * @return void
     */
    public function remove(Domain $item) {
        // TODO: Implement remove() method.
        $this->raiseBeforeRemove();
        $this->raiseRemoved();
    }

    /**
     * save.
     *
     * @return void
     */
    public function save() {
        // TODO: Implement save() method.
        $this->raiseBeforeSave();
        $this->raiseSaved();
    }
}
