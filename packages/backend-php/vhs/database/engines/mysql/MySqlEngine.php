<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:32 PM.
 */

namespace vhs\database\engines\mysql;

use vhs\database\Column;
use vhs\database\Engine;
use vhs\database\exceptions\DatabaseConnectionException;
use vhs\database\exceptions\DatabaseException;
use vhs\database\queries\QueryCount;
use vhs\database\queries\QueryDelete;
use vhs\database\queries\QueryInsert;
use vhs\database\queries\QuerySelect;
use vhs\database\queries\QueryUpdate;
use vhs\Logger;
use vhs\loggers\SilentLogger;

/** @typescript */
class MySqlEngine extends Engine {
    /**
     * autoCreateDatabase.
     *
     * @var bool
     */
    private $autoCreateDatabase;

    /**
     * conn.
     *
     * @var ?\mysqli
     */
    private $conn;

    /**
     * converter.
     *
     * @var mixed
     */
    private $converter;

    /**
     * generator.
     *
     * @var mixed
     */
    private $generator;

    /**
     * info.
     *
     * @var mixed
     */
    private $info;

    /**
     * logger.
     *
     * @var \vhs\Logger
     */
    private $logger;

    /**
     * __construct.
     *
     * @param \vhs\database\engines\mysql\MySqlConnectionInfo $connectionInfo
     * @param ?bool                                           $autoCreateDatabase
     *
     * @return void
     */
    public function __construct(MySqlConnectionInfo $connectionInfo, $autoCreateDatabase = false) {
        $this->info = $connectionInfo;
        $this->autoCreateDatabase = $autoCreateDatabase;

        $this->logger = new SilentLogger();

        $this->generator = new MySqlGenerator();
        $this->converter = new MySqlConverter();
    }

    /**
     * connect.
     *
     * @throws \vhs\database\exceptions\DatabaseConnectionException
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return bool
     */
    public function connect() {
        if (isset($this->conn) && !is_null($this->conn)) {
            return true;
        }

        $this->conn = new \mysqli($this->info->getServer(), $this->info->getUsername(), $this->info->getPassword());

        if ($this->conn->connect_error) {
            throw new DatabaseConnectionException($this->conn->connect_error);
        }

        if ($this->autoCreateDatabase) {
            $sql = "CREATE DATABASE IF NOT EXISTS {$this->info->getDatabase()};";
            if ($this->conn->query($sql) !== true) {
                throw new DatabaseException($this->conn->error);
            }
        }

        $this->conn->select_db($this->info->getDatabase());

        $this->generator->SetMySqli($this->conn);

        return true;
    }

    /**
     * disconnect.
     *
     * @return void
     */
    public function disconnect() {
        if (isset($this->conn) && !is_null($this->conn)) {
            $this->conn->close();
        }

        unset($this->conn);
    }

    /**
     * DateFormat.
     *
     * @return string
     */
    public static function DateFormat() {
        return 'Y-m-d H:i:s';
    }

    /**
     * arbitrary.
     *
     * @param mixed $command
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return mixed
     */
    public function arbitrary($command) {
        $this->logger->log('[ARBITRARY] ' . $command);

        $rows = [];
        if ($q = $this->conn->query($command)) {
            $rows = $q->fetch_all();
            $q->close();

            return $rows;
        }

        throw new DatabaseException($this->conn->error);
    }

    /**
     * count.
     *
     * @param \vhs\database\queries\QueryCount $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return int|null
     */
    public function count(QueryCount $query) {
        $sql = $query->generate($this->generator);

        $this->logger->log($sql);

        if ($q = $this->conn->query($sql)) {
            $rows = $q->fetch_all();
            $row = $rows[0];
            $q->close();

            if (sizeof($row) != 1) {
                return null;
            }

            return $row[0];
        } else {
            throw new DatabaseException($this->conn->error);
        }
    }

    /**
     * delete.
     *
     * @param \vhs\database\queries\QueryDelete $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return bool
     */
    public function delete(QueryDelete $query) {
        $sql = $query->generate($this->generator);

        $this->logger->log($sql);

        if ($q = $this->conn->query($sql)) {
            return true;
        }

        throw new DatabaseException($this->conn->error);
    }

    /**
     * exists.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return bool
     */
    public function exists(QuerySelect $query) {
        return $this->count(new QueryCount($query->table, $query->where, $query->orderBy, $query->limit, $query->offset)) > 0;
    }

    /**
     * insert.
     *
     * @param \vhs\database\queries\QueryInsert $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return mixed
     */
    public function insert(QueryInsert $query) {
        $sql = $query->generate($this->generator);

        $this->logger->log($sql);

        if ($q = $this->conn->query($sql)) {
            return $this->conn->insert_id;
        }

        throw new DatabaseException($this->conn->error);
    }

    /**
     * scalar.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return mixed
     */
    public function scalar(QuerySelect $query) {
        $row = $this->select($query);

        if (sizeof($row) != 1) {
            return null;
        }

        return $row[0][$query->columns->all()[0]->name];
    }

    /**
     * select.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return mixed
     */
    public function select(QuerySelect $query) {
        $sql = $query->generate($this->generator);

        $this->logger->log($sql);

        $records = [];

        if ($q = $this->conn->query($sql)) {
            $rows = $q->fetch_all();

            foreach ($rows as $row) {
                $record = array_combine($query->columns->names(), $row);

                /* TODO fix potential bug with joins having same column names but are namespaced
                 *  ie alias0.col alias1.col
                 * it's entirely possible the mysqli garbage doesn't support this. I haven't bothered to check yet.
                 */
                /** @var Column $col */
                foreach ($query->columns->all() as $col) {
                    if (array_key_exists($col->name, $record) && !is_null($record[$col->name])) {
                        $record[$col->name] = $col->type->convert($this->converter, $record[$col->name]);
                    }
                }

                array_push($records, $record);
            }

            $q->close();
        } else {
            throw new DatabaseException($this->conn->error);
        }

        return $records;
    }

    /**
     * setLogger.
     *
     * @param \vhs\Logger $logger
     *
     * @return void
     */
    public function setLogger(Logger $logger) {
        $this->logger = $logger;
    }

    /**
     * update.
     *
     * @param \vhs\database\queries\QueryUpdate $query
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return bool
     */
    public function update(QueryUpdate $query) {
        $sql = $query->generate($this->generator);

        $this->logger->log($sql);

        if ($q = $this->conn->query($sql)) {
            return true;
        }

        throw new DatabaseException($this->conn->error);
    }
}
