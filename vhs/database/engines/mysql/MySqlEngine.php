<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:32 PM
 */

namespace vhs\database\engines\mysql;

use vhs\database\Column;
use vhs\database\Columns;
use vhs\database\Engine;
use vhs\database\exceptions\DatabaseConnectionException;
use vhs\database\exceptions\DatabaseException;
use vhs\database\limits\Limit;
use vhs\database\offsets\Offset;
use vhs\database\orders\OrderBy;
use vhs\database\queries\Query;
use vhs\database\queries\QueryDelete;
use vhs\database\queries\QueryInsert;
use vhs\database\queries\QuerySelect;
use vhs\database\queries\QueryUpdate;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\database\wheres\Where;
use vhs\Logger;
use vhs\loggers\SilentLogger;

class MySqlEngine extends Engine {

    private $autoCreateDatabase;
    private $generator;
    private $converter;
    private $logger;
    private $info;

    /**
     * @var \mysqli
     */
    private $conn;

    public static function DateFormat() { return "Y-m-d H:i:s"; }

    public function __construct(MySqlConnectionInfo $connectionInfo, $autoCreateDatabase = false) {
        $this->info = $connectionInfo;
        $this->autoCreateDatabase = $autoCreateDatabase;

        $this->logger = new SilentLogger();

        $this->generator = new MySqlGenerator();
        $this->converter = new MySqlConverter();
    }

    public function setLogger(Logger $logger) {
        $this->logger = $logger;
    }

    public function connect() {
        if(isset($this->conn) && !is_null($this->conn)) return true;

        $this->conn = new \mysqli(
            $this->info->getServer(),
            $this->info->getUsername(),
            $this->info->getPassword()
        );

        if($this->conn->connect_error)
            throw new DatabaseConnectionException($this->conn->connect_error);

        if($this->autoCreateDatabase) {
            $sql = "CREATE DATABASE IF NOT EXISTS {$this->info->getDatabase()};";
            if ($this->conn->query($sql) === TRUE) {
                $this->logger->log("Database created successfully");
            } else {
                throw new DatabaseException($this->conn->error);
            }
        }

        $this->conn->select_db($this->info->getDatabase());

        $this->generator->SetMySqli($this->conn);

        return true;
    }

    public function disconnect() {
        if(isset($this->conn) && !is_null($this->conn)) $this->conn->close();

        unset($this->conn);
    }

    public function scalar(QuerySelect $query) {
        $row = $this->select($query);

        if(sizeof($row) <> 1)
            return null;

        return $row[0][$query->columns[0]->name];
    }


    public function count(QuerySelect $query) {

        $query->columns = new Columns(new Column($query->table, "1", Type::String()));

        $sql = $query->generate($this->generator);

        $this->logger->log($sql);

        $rows = 0;

        if($q = $this->conn->query($sql)) {
            $rows = $q->num_rows;

            $q->close();
        } else {
            throw new DatabaseException($this->conn->error);
        }

        return $rows;
    }

    public function exists(QuerySelect $query) {
        return ($this->count($query) > 0);
    }

    public function arbitrary($command) {
        $this->logger->log("[ARBITRARY] " . $command);

        if($q = $this->conn->query($command)) {
            $q->close();

            return true;
        }

        throw new DatabaseException($this->conn->error);
    }

    public function select(QuerySelect $query) {
        $sql = $query->generate($this->generator);

        $this->logger->log($sql);

        $records = array();

        if($q = $this->conn->query($sql)) {

            $rows = $q->fetch_all();

            foreach($rows as $row) {
                $record = array_combine($query->columns->names(), $row);

                /** @var Column $col */
                foreach($query->columns->all() as $col)
                    if (in_array($col->name, $record) && !is_null($record[$col->name]))
                        $record[$col->name] = $col->type->convert($this->converter, $record[$col->name]);

                array_push($records, $record);
            }

            $q->close();
        } else {
            throw new DatabaseException($this->conn->error);
        }

        $this->logger->log(var_export($records, true));

        return $records;
    }

    public function delete(QueryDelete $query) {
        $sql = $query->generate($this->generator);

        $this->logger->log($sql);

        if($q = $this->conn->query($sql))
            return true;

        throw new DatabaseException($this->conn->error);
    }

    public function update(QueryUpdate $query) {
        $sql = $query->generate($this->generator);

        $this->logger->log($sql);

        if($q = $this->conn->query($sql))
            return true;

        throw new DatabaseException($this->conn->error);
    }

    public function insert(QueryInsert $query) {
        $sql = $query->generate($this->generator);

        $this->logger->log($sql);

        if($q = $this->conn->query($sql))
            return $this->conn->insert_id;

        throw new DatabaseException($this->conn->error);
    }
}
