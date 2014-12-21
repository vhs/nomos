<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 11:15 AM
 */

namespace vhs\database;


use vhs\database\engines\memory\InMemoryEngine;
use vhs\database\exceptions\DatabaseConnectionException;
use vhs\database\exceptions\DatabaseException;
use vhs\database\orders\OrderBy;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\Logger;
use vhs\loggers\SilentLogger;
use vhs\Singleton;

class Database extends Singleton {

    /** @var bool */
    private $rethrow;
    /** @var Logger */
    private $logger;
    /** @var Engine */
    private $engine;

    protected function __construct()
    {
        $this->setLoggerInternal(new SilentLogger());
        $this->setEngineInternal(new InMemoryEngine());
        $this->setRethrowInternal(true);
    }

    public function __destruct() {
        $this->engine->disconnect();
    }

    private function handleException($exception) {
        $this->logger->log($exception);

        if($this->rethrow)
            throw $exception;
    }

    private function invokeEngine(callable $func) {
        try {
            $this->engine->connect();
        } catch(DatabaseConnectionException $ex) {
            $this->handleException($ex);
        }

        $retval = null;

        try {
            $retval = $func();
        } catch(DatabaseException $ex) {
            $this->handleException($ex);
        }

        return $retval;
    }

    private function setRethrowInternal($rethrow) {
        $this->rethrow = $rethrow;
    }

    public static function setRethrow($rethrow) {
        $db = self::getInstance();

        $db->setRethrowInternal($rethrow);
    }

    private function setEngineInternal(Engine $engine) {
        if(!is_null($this->engine))
            $this->engine->disconnect();

        $this->engine = $engine;

        $this->logger->log("Using: " . $this->engine);
    }

    public static function setEngine(Engine $engine) {
        $db = self::getInstance();

        $db->setEngineInternal($engine);
    }

    private function setLoggerInternal(Logger $logger) {
        $this->logger = $logger;

        $this->logger->log("Using: " . $this->logger);
    }

    public static function setLogger(Logger $logger) {
        $db = self::getInstance();

        $db->setLoggerInternal($logger);
    }

    public static function scalar(Table $table, Column $column, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $db = self::getInstance();
        return $db->invokeEngine(function() use ($db, $table, $column, $where, $orderBy, $limit) {
            return $db->engine->scalar($table, $column, $where, $orderBy, $limit);
        });
    }

    public static function select(Table $table, Columns $columns, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $db = self::getInstance();
        return $db->invokeEngine(function() use ($db, $table, $columns, $where, $orderBy, $limit) {
            return $db->engine->select($table, $columns, $where, $orderBy, $limit);
        });
    }

    public static function delete(Table $table, Where $where = null) {
        $db = self::getInstance();
        return $db->invokeEngine(function() use ($db, $table, $where) {
            return $db->engine->delete($table, $where);
        });
    }

    public static function create(Table $table, $data) {
        $db = self::getInstance();
        return $db->invokeEngine(function() use ($db, $table, $data) {
            return $db->engine->create($table, $data);
        });
    }

    public static function update(Table $table, $data, Where $where = null) {
        $db = self::getInstance();
        return $db->invokeEngine(function() use ($db, $table, $data, $where) {
            return $db->engine->update($table, $data, $where);
        });
    }

    public static function count(Table $table, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $db = self::getInstance();
        return $db->invokeEngine(function() use ($db, $table, $where, $orderBy, $limit) {
            return $db->engine->count($table, $where, $orderBy, $limit);
        });
    }

    public static function exists(Table $table, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $db = self::getInstance();
        return $db->invokeEngine(function() use ($db, $table, $where, $orderBy, $limit) {
            return $db->engine->exists($table, $where, $orderBy, $limit);
        });
    }

    public static function query(Query $query) {
        $db = self::getInstance();
        return $db->invokeEngine(function() use ($db, $query) {
            return $db->engine->query($query);
        });
    }

    public static function arbitrary($command) {
        $db = self::getInstance();
        return $db->invokeEngine(function() use ($db, $command) {
            //TODO warn that this is not ideal
            return $db->engine->arbitrary($command);
        });
    }
}
