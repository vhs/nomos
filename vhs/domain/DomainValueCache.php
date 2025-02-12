<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 6:16 PM.
 */

namespace vhs\domain;

/** @typescript */
class DomainValueCache {
    private $cache;
    private $changed = false;
    private $keys;

    public function __construct($keys) {
        $this->keys = $keys;
        $this->cache = array_fill_keys($this->keys, null);
    }

    public function clear() {
        unset($this->cache);
        $this->cache = array_fill_keys($this->keys, null);
    }

    public function getValue($name) {
        return $this->cache[$name];
    }

    public function hasChanged() {
        return $this->changed;
    }

    public function setValue($name, $value, $silent = false) {
        $this->changed = $this->changed || !$silent;

        $this->cache[$name] = $value;
    }
}
