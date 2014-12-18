<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 11:48 AM
 */

namespace vhs\domain;


class Notifier {
    private static $__staticListeners;
    private $__listeners;

    private function __ensureListeners($event) {
        if(is_null($this->__listeners))
            $this->__listeners = array();

        if(!isset($this->__listeners[$event]))
            $this->__listeners[$event] = array();
    }

    private static function __ensureStaticListeners($event) {
        if(is_null(self::$__staticListeners))
            self::$__staticListeners = array();

        $class = get_called_class();

        if(!isset(self::$__staticListeners[$class]))
            self::$__staticListeners[$class] = array();

        if(!isset(self::$__staticListeners[$class][$event]))
            self::$__staticListeners[$class][$event] = array();
    }

    protected function on($event, callable $listener) {
        $this->__ensureListeners($event);

        array_push($this->__listeners[$event], $listener);
    }

    protected static function staticOn($event, callable $listener) {
        self::__ensureStaticListeners($event);

        $class = get_called_class();

        array_push(self::$__staticListeners[$class][$event], $listener);
    }

    protected function raise($event, ...$args) {
        $this->__ensureListeners($event);

        foreach($this->__listeners[$event] as $listener) {
            $listener($args);
        }
    }

    protected  function staticRaise($event, ...$args) {
        self::__ensureStaticListeners($event);

        $class = get_called_class();

        foreach(self::$__staticListeners[$class][$event] as $listener) {
            $listener($args);
        }
    }
}