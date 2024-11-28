<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:21 PM
 */

namespace vhs\messaging;

use vhs\Logger;
use vhs\loggers\SilentLogger;
use vhs\messaging\Engine;
use vhs\Singleton;

//TODO do this stuff in a thread prob, or at least in a non-blocking way maybe?
class MessageQueue extends Singleton {
    /** @var Engine */
    private $engine;

    /** @var Logger */
    private $logger;
    /** @var bool */
    private $rethrow;

    protected function __construct() {
        $this->setLoggerInternal(new SilentLogger());
        $this->setRethrowInternal(true);
    }

    public function __destruct() {
        $this->engine->disconnect();
    }

    public static function consume($channel, $queue, callable $callback) {
        /** @var MessageQueue $mq */
        $mq = self::getInstance();

        $mq->invokeEngine(function () use ($mq, $channel, $queue, $callback) {
            return $mq->engine->consume($channel, $queue, $callback);
        });
    }

    public static function ensure($channel, $queue) {
        /** @var MessageQueue $mq */
        $mq = self::getInstance();

        $mq->invokeEngine(function () use ($mq, $channel, $queue) {
            return $mq->engine->ensure($channel, $queue);
        });
    }

    public static function publish($channel, $queue, $message) {
        /** @var MessageQueue $mq */
        $mq = self::getInstance();

        $mq->invokeEngine(function () use ($mq, $channel, $queue, $message) {
            return $mq->engine->publish($channel, $queue, $message);
        });
    }

    public static function setEngine(Engine $engine) {
        /** @var MessageQueue $mq */
        $mq = self::getInstance();

        $mq->setEngineInternal($engine);
    }

    public static function setLogger(Logger $logger) {
        /** @var MessageQueue $mq */
        $mq = self::getInstance();

        $mq->setLoggerInternal($logger);
    }

    public static function setRethrow($rethrow) {
        /** @var MessageQueue $mq */
        $mq = self::getInstance();

        $mq->setRethrowInternal($rethrow);
    }

    private function handleException($exception) {
        $this->logger->log($exception);

        if ($this->rethrow) {
            throw $exception;
        }
    }

    private function invokeEngine(callable $func) {
        try {
            $this->engine->connect();
        } catch (\Exception $ex) {
            $this->handleException($ex);
        }

        $retval = null;

        try {
            $retval = $func();
        } catch (\Exception $ex) {
            $this->handleException($ex);
        }

        return $retval;
    }

    private function setEngineInternal(Engine $engine) {
        if (!is_null($this->engine)) {
            $this->engine->disconnect();
        }

        $this->engine = $engine;
    }

    private function setLoggerInternal(Logger $logger) {
        $this->logger = $logger;
    }

    private function setRethrowInternal($rethrow) {
        $this->rethrow = $rethrow;
    }
}
