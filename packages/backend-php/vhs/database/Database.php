<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 11:15 AM.
 */

namespace vhs\database;

use vhs\database\engines\memory\InMemoryEngine;
use vhs\database\exceptions\DatabaseConnectionException;
use vhs\database\exceptions\DatabaseException;
use vhs\database\queries\QueryCount;
use vhs\database\queries\QueryDelete;
use vhs\database\queries\QueryInsert;
use vhs\database\queries\QuerySelect;
use vhs\database\queries\QueryUpdate;
use vhs\Logger;
use vhs\loggers\SilentLogger;
use vhs\Singleton;

/**
 * @method static \vhs\database\Database getInstance()
 *
 * @typescript
 */
class Database extends Singleton {
    /** @var Engine */
    private $engine;

    /** @var Logger */
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
        $this->setEngineInternal(new InMemoryEngine());
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
     * arbitrary.
     *
     * @param mixed $command
     *
     * @return mixed
     */
    public static function arbitrary($command) {
        /** @var Database $db */
        $db = self::getInstance();

        return $db->invokeEngine(function () use ($db, $command) {
            // TODO warn that this is not ideal
            return $db->engine->arbitrary($command);
        });
    }

    /**
     * count.
     *
     * @param \vhs\database\queries\QueryCount $query
     *
     * @return mixed
     */
    public static function count(QueryCount $query) {
        /** @var Database $db */
        $db = self::getInstance();

        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->count($query);
        });
    }

    /**
     * DateFormat.
     *
     * @return string
     */
    public static function DateFormat() {
        return self::getInstance()->engine->DateFormat();
    }

    /**
     * delete.
     *
     * @param \vhs\database\queries\QueryDelete $query
     *
     * @return mixed
     */
    public static function delete(QueryDelete $query) {
        /** @var Database $db */
        $db = self::getInstance();

        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->delete($query);
        });
    }

    /**
     * exists.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @return mixed
     */
    public static function exists(QuerySelect $query) {
        /** @var Database $db */
        $db = self::getInstance();

        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->exists($query);
        });
    }

    /**
     * insert.
     *
     * @param \vhs\database\queries\QueryInsert $query
     *
     * @return mixed
     */
    public static function insert(QueryInsert $query) {
        /** @var Database $db */
        $db = self::getInstance();

        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->insert($query);
        });
    }

    /**
     * scalar.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @return mixed
     */
    public static function scalar(QuerySelect $query) {
        /** @var Database $db */
        $db = self::getInstance();

        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->scalar($query);
        });
    }

    /**
     * select.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @return mixed
     */
    public static function select(QuerySelect $query) {
        /** @var Database $db */
        $db = self::getInstance();

        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->select($query);
        });
    }

    /**
     * setEngine.
     *
     * @param \vhs\database\Engine $engine
     *
     * @return void
     */
    public static function setEngine(Engine $engine) {
        /** @var Database $db */
        $db = self::getInstance();

        $db->setEngineInternal($engine);
    }

    /**
     * setLogger.
     *
     * @param \vhs\Logger $logger
     *
     * @return void
     */
    public static function setLogger(Logger $logger) {
        $db = self::getInstance();

        $db->setLoggerInternal($logger);
    }

    /**
     * setRethrow.
     *
     * @param mixed $rethrow
     *
     * @return void
     */
    public static function setRethrow($rethrow) {
        /** @var Database $db */
        $db = self::getInstance();

        $db->setRethrowInternal($rethrow);
    }

    /**
     * update.
     *
     * @param \vhs\database\queries\QueryUpdate $query
     *
     * @return mixed
     */
    public static function update(QueryUpdate $query) {
        /** @var Database $db */
        $db = self::getInstance();

        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->update($query);
        });
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
        } catch (DatabaseConnectionException $ex) {
            $this->handleException($ex);
        }

        $retval = null;

        try {
            $retval = $func();
        } catch (DatabaseException $ex) {
            $this->handleException($ex);
        }

        return $retval;
    }

    /**
     * setEngineInternal.
     *
     * @param \vhs\database\Engine $engine
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
