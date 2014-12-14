<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:32 PM
 */

namespace vhs\database\engines;

use vhs\database\Engine;
use vhs\database\exceptions\DatabaseConnectionException;
use vhs\database\exceptions\DatabaseException;
use vhs\database\OrderBy;
use vhs\database\Where;
use vhs\Logger;
use vhs\loggers\SilentLogger;

class MySqlEngine extends Engine {

    private $autoCreateDatabase;
    private $whereGenerator;
    private $orderByGenerator;
    private $logger;
    private $info;
    private $conn;

    public function __construct(MySqlConnectionInfo $connectionInfo, $autoCreateDatabase = false) {
        $this->info = $connectionInfo;
        $this->autoCreateDatabase = $autoCreateDatabase;

        $this->logger = new SilentLogger();

        $this->whereGenerator = new MySqlWhereGenerator();
        $this->orderByGenerator = new MySqlOrderByGenerator();
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

        return true;
    }

    public function disconnect() {
        if(isset($this->conn) && !is_null($this->conn)) $this->conn->close();

        unset($this->conn);
    }

    public function scalar($table, $column, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $row = $this->select($table, array($column), $where, $orderBy, $limit);

        if(sizeof($row) <> 1)
            return null;

        return $row[0][0];
    }

    public function select($table, $columns, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $selector = implode(", ", $columns);
        $clause = (!is_null($where)) ? $where->generate($this->whereGenerator) : "";
        $orderClause = (!is_null($orderBy)) ? $orderBy->generate($this->orderByGenerator) : "";

        $sql = "SELECT {$selector} FROM {$table}";

        if(!empty($clause))
            $sql .= " WHERE {$clause}";

        if(!empty($orderClause))
            $sql .= " ORDER BY {$orderClause}";

        if(isset($limit) && is_numeric($limit))
            $sql .= " LIMIT " . intval($limit);

        $this->logger->log($sql);

        $records = array();

        if($q = $this->conn->query($sql)) {

            $rows = $q->fetch_all();

            foreach($rows as $row)
                array_push($records, array_combine($columns, $row));

            $q->close();
        } else {
            throw new DatabaseException($this->conn->error);
        }


        return $records;
    }

    public function delete($table, Where $where = null) {
        $clause = (!is_null($where)) ? $where->generate($this->whereGenerator) : "";

        $sql = "DELETE FROM {$table}";

        if(!empty($clause))
            $sql .= " WHERE {$clause}";

        $this->logger->log($sql);

        if($q = $this->conn->query($sql)) {
            return true;
        } else {
            throw new DatabaseException($this->conn->error);
        }

        return false;
    }

    public function create($table, $data) {
        $columns = array();
        $values = array();

        foreach($data as $column => $value) {
            array_push($columns, $column);
            array_push($values, "'" . $value . "'");
        }

        $columns = implode(", ", $columns);
        $values = implode(", ", $values);

        $sql = "INSERT INTO {$table} ({$columns}) VALUES ({$values})";

        $this->logger->log($sql);

        if($q = $this->conn->query($sql)) {
            return $this->conn->insert_id;
        } else {
            throw new DatabaseException($this->conn->error);
        }

        return null;
    }

    public function update($table, $data, Where $where = null) {
        $clause = (!is_null($where)) ? $where->generate($this->whereGenerator) : "";

        $setsql = "";

        foreach($data as $column => $value)
            $setsql .= "{$column} = '{$value}'";

        $sql = "UPDATE {$table} SET {$setsql}";

        if(!empty($clause))
            $sql .= " WHERE {$clause}";

        $this->logger->log($sql);

        if($q = $this->conn->query($sql)) {
            return true;
        } else {
            throw new DatabaseException($this->conn->error);
        }

        return false;
    }

    public function count($table, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $clause = (!is_null($where)) ? $where->generate($this->whereGenerator) : "";
        $orderClause = (!is_null($orderBy)) ? $orderBy->generate($this->orderByGenerator) : "";

        $sql = "SELECT 1 FROM {$table}";

        if(!empty($clause))
            $sql .= " WHERE {$clause}";

        if(!empty($orderClause))
            $sql .= " ORDER BY {$orderClause}";

        if(isset($limit) && is_numeric($limit))
            $sql .= " LIMIT " . intval($limit);

        $this->logger->log($sql);

        $rows = 0;

        if($q = $this->conn->query($sql)) {

            $rows = $q->num_rows();

            $q->close();
        } else {
            throw new DatabaseException($this->conn->error);
        }

        return $rows;
    }

    public function exists($table, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        return ($this->count($table, $where, $orderBy, $limit) > 0);
    }

    public function arbitrary($command) {
        $this->logger->log("[ARBITRARY] " . $command);

        if($q = $this->conn->query($command)) {
            return true;
        } else {
            throw new DatabaseException($this->conn->error);
        }

        return false;
    }
}
