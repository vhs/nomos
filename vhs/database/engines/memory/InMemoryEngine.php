<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 6:16 PM
 */

namespace vhs\database\engines\memory;


use vhs\database\Column;
use vhs\database\Columns;
use vhs\database\Engine;
use vhs\database\orders\OrderBy;
use vhs\database\queries\Query;
use vhs\database\Table;
use vhs\database\wheres\Where;
use vhs\Logger;
use vhs\loggers\SilentLogger;

class InMemoryEngine extends Engine {
    private $keyIncrementors = array();
    private $datastore = array();
    private $logger;
    private $whereGenerator;

    public function __construct() {
        $this->logger = new SilentLogger();

        $this->whereGenerator = new InMemoryWhereGenerator();
    }

    public function setLogger(Logger $logger) {
        $this->logger = $logger;
    }

    public function connect() {
        return true; //if we can't "connect" to memory but got this far, I don't know wtf
    }

    public function disconnect() {
        return true; // ha
    }

    public function scalar(Table $table, Column $column, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $this->logger->log("scalar: ");
        $value = $this->select($table, new Columns($column), $where, $orderBy, $limit);

        if(sizeof($value) <> 1)
            return null;
        else
            return $value[0];
    }

    public function select(Table $table, Columns $columns, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $this->logger->log("select " . $table->name . " " . implode(", ", $columns->names()) . " " . $where);

        if(!array_key_exists($table->name, $this->datastore))
            return null;

        $match = (!is_null($where)) ? $where->generate($this->whereGenerator) : function() { return true; };

        if(isset($orderBy) || isset($limit))
            throw new \Exception("TODO implement OrderBy and limit for InMemoryEngine");

        $results = array();

        $cols = array();

        foreach($columns->all() as $column)
            array_push($cols, $column->name);

        foreach($this->datastore[$table->name] as $row) {
            if ($match($row)) {
                array_push(
                    $results,
                    array_intersect_key($row, array_fill_keys($cols, false))
                );
            }
        }

        return $results;
    }

    public function delete(Table $table, Where $where = null) {
        $this->logger->log("delete " . $table->name . " " . $where);
        if(!array_key_exists($table->name, $this->datastore))
            return false;

        $match = (!is_null($where)) ? $where->generate($this->whereGenerator) : function($item) { return true; };

        foreach($this->datastore[$table->name] as $key => $row) {
            if ($match($row)) {
                unset($this->datastore[$table->name][$key]);
            }
        }

        return true;
    }

    public function create(Table $table, $data) {
        $this->logger->log("create " . $table->name . " " . var_export($data, true));
        if(!array_key_exists($table->name, $this->datastore))
            $this->datastore[$table->name] = array();

        $pks = array();

        foreach($table->getPrimaryKeys() as $pk) {
            if(!array_key_exists($pk->column->name, $data)) {
                $key = $table->name . "." . $pk->column->name;
                if(!array_key_exists($key, $this->keyIncrementors))
                    $this->keyIncrementors[$key] = 0;
                $this->keyIncrementors[$key] += 1;
                $pks[$pk->column->name] = $data[$pk->column->name] = $this->keyIncrementors[$key];
            }
        }

        array_push($this->datastore[$table->name], $data);

        if(count($pks) == 1)
            return array_values($pks)[0];

        return $pks;
    }

    public function update(Table $table, $data, Where $where = null) {
        $this->logger->log("update " . $table->name . " " . var_export($data, true) . " " . $where);
        if(!array_key_exists($table->name, $this->datastore))
            return false;

        $match = (!is_null($where)) ? $where->generate($this->whereGenerator) : function($item) { return true; };

        foreach($this->datastore[$table->name] as $key => $row) {
            if ($match($row)) {
                foreach($data as $column => $value) {
                    $this->datastore[$table->name][$key][$column] = $value;
                }
            }
        }

        return true;
    }

    public function count(Table $table, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $this->logger->log("count " . $table->name . " " . $where);
        if(!array_key_exists($table->name, $this->datastore))
            return false;

        $match = (!is_null($where)) ? $where->generate($this->whereGenerator) : function($item) { return true; };

        if(isset($orderBy) || isset($limit))
            throw new \Exception("TODO implement OrderBy and limit for InMemoryEngine");

        $count = 0;

        foreach($this->datastore[$table->name] as $row)
            if ($match($row)) $count += 1;

        return $count;
    }

    public function exists(Table $table, Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $this->logger->log("exists: ");
        return $this->count($table, $where, $orderBy, $limit) > 0;
    }

    public function arbitrary($command) {
        return false;
    }

    public function query(Query $query)
    {
        // TODO: Implement query() method.
    }
}