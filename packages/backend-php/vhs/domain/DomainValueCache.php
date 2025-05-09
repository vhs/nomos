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
    /**
     * cache.
     *
     * @var mixed
     */
    private $cache;

    /**
     * changed.
     *
     * @var bool
     */
    private $changed = false;

    /**
     * keys.
     *
     * @var mixed
     */
    private $keys;

    /**
     * __construct.
     *
     * @param mixed $keys
     *
     * @return void
     */
    public function __construct($keys) {
        $this->keys = $keys;
        $this->cache = array_fill_keys($this->keys, null);
    }

    /**
     * clear.
     *
     * @return void
     */
    public function clear() {
        unset($this->cache);
        $this->cache = array_fill_keys($this->keys, null);
    }

    /**
     * getValue.
     *
     * @param mixed $name
     *
     * @return mixed
     */
    public function getValue($name) {
        return $this->cache[$name];
    }

    /**
     * hasChanged.
     *
     * @return bool
     */
    public function hasChanged() {
        return $this->changed;
    }

    /**
     * setValue.
     *
     * @param mixed $name
     * @param mixed $value
     * @param mixed $silent
     *
     * @return void
     */
    public function setValue($name, $value, $silent = false) {
        $this->changed = $this->changed || !$silent;

        $this->cache[$name] = $value;
    }
}
