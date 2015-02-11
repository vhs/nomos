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
use vhs\database\orders\OrderBy;
use vhs\database\queries\Query;
use vhs\database\Table;
use vhs\database\wheres\Where;
use vhs\Logger;
use vhs\loggers\SilentLogger;

class MySqlEngine extends Engine {

    private $autoCreateDatabase;
    private $generator;
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

    public function scalar(Table $table, Column $column, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $row = $this->select($table, new Columns($column), $where, $orderBy, $limit);

        if(sizeof($row) <> 1)
            return null;

        return $row[0][$column->name];
    }

    public function select(Table $table, Columns $columns, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $selector = implode(", ", array_map(function($col) { return '`' . $col . '`'; }, $columns->names()));
        $clause = (!is_null($where)) ? $where->generate($this->generator) : "";
        $orderClause = (!is_null($orderBy)) ? $orderBy->generate($this->generator) : "";

        $boolColumnNames = array();
        /** @var Column $column */
        foreach($columns->all() as $column) {
            if(get_class($column->type) == "vhs\\database\\types\\TypeBool")
                array_push($boolColumnNames, $column->name);
        }

        $sql = "SELECT {$selector} FROM `{$table->name}`";

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

            foreach($rows as $row) {
                $record = array_combine($columns->names(), $row);

                //TODO clean up how we translate values from mysql to php. Fucking mysql and their bit bools
                foreach($boolColumnNames as $col)
                    if(!is_null($record[$col]))
                        $record[$col] = ($record[$col] == 1);

                array_push($records, $record);
            }

            $q->close();
        } else {
            throw new DatabaseException($this->conn->error);
        }

        return $records;
    }

    public function delete(Table $table, Where $where = null) {
        $clause = (!is_null($where)) ? $where->generate($this->generator) : "";

        $sql = "DELETE FROM `{$table->name}`";

        if(!empty($clause))
            $sql .= " WHERE {$clause}";

        $this->logger->log($sql);

        if($q = $this->conn->query($sql))
            return true;

        throw new DatabaseException($this->conn->error);
    }

    public function create(Table $table, $data) {
        $columns = array();
        $values = array();

        foreach($data as $column => $value) {
            array_push($columns, '`' . $column . '`');
            array_push($values, "'" . $value . "'");
        }

        $columns = implode(", ", $columns);
        $values = implode(", ", $values);

        $sql = "INSERT INTO `{$table->name}` ({$columns}) VALUES ({$values})";

        $this->logger->log($sql);

        if($q = $this->conn->query($sql))
            return $this->conn->insert_id;

        throw new DatabaseException($this->conn->error);
    }

    public function update(Table $table, $data, Where $where = null) {
        $clause = (!is_null($where)) ? $where->generate($this->generator) : "";
        $setsql = implode(", ",
            array_map(
                function($column, $value) {
                    return "`" . $column . "` = '" . $value . "'";
                },
                array_keys($data),
                array_values($data)
            )
        );

        $sql = "UPDATE `{$table->name}` SET {$setsql}";

        if(!empty($clause))
            $sql .= " WHERE {$clause}";

        $this->logger->log($sql);

        if($q = $this->conn->query($sql))
            return true;

        throw new DatabaseException($this->conn->error);
    }

    public function count(Table $table, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $clause = (!is_null($where)) ? $where->generate($this->generator) : "";
        $orderClause = (!is_null($orderBy)) ? $orderBy->generate($this->generator) : "";

        $sql = "SELECT 1 FROM `{$table->name}`";

        if(!empty($clause))
            $sql .= " WHERE {$clause}";

        if(!empty($orderClause))
            $sql .= " ORDER BY {$orderClause}";

        if(isset($limit) && is_numeric($limit))
            $sql .= " LIMIT " . intval($limit);

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

    public function exists(Table $table, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        return ($this->count($table, $where, $orderBy, $limit) > 0);
    }

    public function arbitrary($command) {
        $this->logger->log("[ARBITRARY] " . $command);

        if($q = $this->conn->query($command))
            return true;

        throw new DatabaseException($this->conn->error);
    }

    public function query(Query $query)
    {
        // TODO: Implement query() method.
    }
}
