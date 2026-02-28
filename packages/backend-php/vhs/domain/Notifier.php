<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 11:48 AM.
 */

namespace vhs\domain;

/** @typescript */
class Notifier {
    /**
     * __staticListeners.
     *
     * @var mixed[]
     */
    private static $__staticListeners;

    /**
     * __listeners.
     *
     * @var mixed[]
     */
    private $__listeners;

    /**
     * staticOn.
     *
     * @param string   $event
     * @param callable $listener
     *
     * @return void
     */
    protected static function staticOn($event, callable $listener) {
        self::__ensureStaticListeners($event);

        $class = get_called_class();

        array_push(self::$__staticListeners[$class][$event], $listener);
    }

    /**
     * on.
     *
     * @param string   $event
     * @param callable $listener
     *
     * @return void
     */
    protected function on($event, callable $listener) {
        $this->__ensureListeners($event);

        array_push($this->__listeners[$event], $listener);
    }

    /**
     * raise.
     *
     * @param mixed $event
     * @param mixed ...$args
     *
     * @return void
     */
    protected function raise($event, ...$args) {
        $this->__ensureListeners($event);

        foreach ($this->__listeners[$event] as $listener) {
            $listener($args);
        }
    }

    /**
     * staticRaise.
     *
     * @param mixed $event
     * @param mixed ...$args
     *
     * @return void
     */
    protected function staticRaise($event, ...$args) {
        self::__ensureStaticListeners($event);

        $class = get_called_class();

        foreach (self::$__staticListeners[$class][$event] as $listener) {
            $listener($args);
        }
    }

    /**
     * __ensureListeners.
     *
     * @param mixed $event
     *
     * @return void
     */
    private function __ensureListeners($event) {
        if (is_null($this->__listeners)) {
            $this->__listeners = [];
        }

        if (!isset($this->__listeners[$event])) {
            $this->__listeners[$event] = [];
        }
    }

    /**
     * __ensureStaticListeners.
     *
     * @param mixed $event
     *
     * @return void
     */
    private static function __ensureStaticListeners($event) {
        if (is_null(self::$__staticListeners)) {
            self::$__staticListeners = [];
        }

        $class = get_called_class();

        if (!isset(self::$__staticListeners[$class])) {
            self::$__staticListeners[$class] = [];
        }

        if (!isset(self::$__staticListeners[$class][$event])) {
            self::$__staticListeners[$class][$event] = [];
        }
    }
}
