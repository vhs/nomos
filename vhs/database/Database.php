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
use vhs\database\queries\Query;
use vhs\database\queries\QueryCount;
use vhs\database\queries\QueryDelete;
use vhs\database\queries\QueryInsert;
use vhs\database\queries\QuerySelect;
use vhs\database\queries\QueryUpdate;
use vhs\Logger;
use vhs\loggers\SilentLogger;
use vhs\Singleton;

class Database extends Singleton {
    /** @var Engine */
    private $engine;
    /** @var Logger */
    private $logger;
    /** @var bool */
    private $rethrow;

    protected function __construct() {
        $this->setLoggerInternal(new SilentLogger());
        $this->setEngineInternal(new InMemoryEngine());
        $this->setRethrowInternal(true);
    }

    public function __destruct() {
        $this->engine->disconnect();
    }

    public static function arbitrary($command) {
        /** @var Database $db */
        $db = self::getInstance();
        return $db->invokeEngine(function () use ($db, $command) {
            //TODO warn that this is not ideal
            return $db->engine->arbitrary($command);
        });
    }

    public static function count(QueryCount $query) {
        /** @var Database $db */
        $db = self::getInstance();
        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->count($query);
        });
    }

    public static function DateFormat() {
        return self::getInstance()->engine->DateFormat();
    }

    public static function delete(QueryDelete $query) {
        /** @var Database $db */
        $db = self::getInstance();
        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->delete($query);
        });
    }

    public static function exists(QuerySelect $query) {
        /** @var Database $db */
        $db = self::getInstance();
        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->exists($query);
        });
    }

    public static function insert(QueryInsert $query) {
        /** @var Database $db */
        $db = self::getInstance();
        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->insert($query);
        });
    }

    public static function scalar(QuerySelect $query) {
        /** @var Database $db */
        $db = self::getInstance();
        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->scalar($query);
        });
    }

    public static function select(QuerySelect $query) {
        /** @var Database $db */
        $db = self::getInstance();
        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->select($query);
        });
    }

    public static function setEngine(Engine $engine) {
        /** @var Database $db */
        $db = self::getInstance();

        $db->setEngineInternal($engine);
    }

    public static function setLogger(Logger $logger) {
        $db = self::getInstance();

        $db->setLoggerInternal($logger);
    }

    public static function setRethrow($rethrow) {
        /** @var Database $db */
        $db = self::getInstance();

        $db->setRethrowInternal($rethrow);
    }

    public static function update(QueryUpdate $query) {
        /** @var Database $db */
        $db = self::getInstance();
        return $db->invokeEngine(function () use ($db, $query) {
            return $db->engine->update($query);
        });
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
