<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:21 PM.
 */

namespace vhs\messaging;

use vhs\Logger;
use vhs\loggers\SilentLogger;
use vhs\messaging\Engine;
use vhs\Singleton;

//TODO do this stuff in a thread prob, or at least in a non-blocking way maybe?
/**
 * @method static \vhs\messaging\MessageQueue getInstance()
 *
 * @typescript
 */
class MessageQueue extends Singleton {
    /** @var \vhs\messaging\Engine */
    private $engine;

    /** @var \vhs\Logger */
    private $logger;

    /** @var bool */
    private $rethrow;

    /**
     * __construct.
     *
     * @return void
     */
    protected function __construct() {
        $this->setLoggerInternal(new SilentLogger());
        $this->setRethrowInternal(true);
    }

    /**
     * __destruct.
     *
     * @return void
     */
    public function __destruct() {
        $this->engine->disconnect();
    }

    /**
     * consume.
     *
     * @param mixed    $channel
     * @param mixed    $queue
     * @param callable $callback
     *
     * @return void
     */
    public static function consume($channel, $queue, callable $callback) {
        $mq = self::getInstance();

        $mq->invokeEngine(function () use ($mq, $channel, $queue, $callback): string {
            return $mq->engine->consume($channel, $queue, $callback);
        });
    }

    /**
     * ensure.
     *
     * @param mixed $channel
     * @param mixed $queue
     *
     * @return void
     */
    public static function ensure($channel, $queue) {
        /** @var MessageQueue $mq */
        $mq = self::getInstance();

        $mq->invokeEngine(function () use ($mq, $channel, $queue) {
            $mq->engine->ensure($channel, $queue);
        });
    }

    /**
     * publish.
     *
     * @param mixed $channel
     * @param mixed $queue
     * @param mixed $message
     *
     * @return void
     */
    public static function publish($channel, $queue, $message) {
        /** @var MessageQueue $mq */
        $mq = self::getInstance();

        $mq->invokeEngine(function () use ($mq, $channel, $queue, $message) {
            $mq->engine->publish($channel, $queue, $message);
        });
    }

    /**
     * setEngine.
     *
     * @param \vhs\messaging\Engine $engine
     *
     * @return void
     */
    public static function setEngine(Engine $engine) {
        /** @var MessageQueue $mq */
        $mq = self::getInstance();

        $mq->setEngineInternal($engine);
    }

    /**
     * setLogger.
     *
     * @param \vhs\Logger $logger
     *
     * @return void
     */
    public static function setLogger(Logger $logger) {
        /** @var MessageQueue $mq */
        $mq = self::getInstance();

        $mq->setLoggerInternal($logger);
    }

    /**
     * setRethrow.
     *
     * @param mixed $rethrow
     *
     * @return void
     */
    public static function setRethrow($rethrow) {
        /** @var MessageQueue $mq */
        $mq = self::getInstance();

        $mq->setRethrowInternal($rethrow);
    }

    /**
     * handleException.
     *
     * @param mixed $exception
     *
     * @return void
     */
    private function handleException($exception) {
        $this->logger->log($exception);

        if ($this->rethrow) {
            throw $exception;
        }
    }

    /**
     * invokeEngine.
     *
     * @param callable $func
     *
     * @return mixed
     */
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

    /**
     * setEngineInternal.
     *
     * @param \vhs\messaging\Engine $engine
     *
     * @return void
     */
    private function setEngineInternal(Engine $engine) {
        if (!is_null($this->engine)) {
            $this->engine->disconnect();
        }

        $this->engine = $engine;
    }

    /**
     * setLoggerInternal.
     *
     * @param \vhs\Logger $logger
     *
     * @return void
     */
    private function setLoggerInternal(Logger $logger) {
        $this->logger = $logger;
    }

    /**
     * setRethrowInternal.
     *
     * @param mixed $rethrow
     *
     * @return void
     */
    private function setRethrowInternal($rethrow) {
        $this->rethrow = $rethrow;
    }
}
