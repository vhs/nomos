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
use vhs\database\queries\QueryDelete;
use vhs\database\queries\QueryInsert;
use vhs\database\queries\QuerySelect;
use vhs\database\queries\QueryUpdate;
use vhs\database\queries\QueryCount;
use vhs\database\Table;
use vhs\database\wheres\Where;
use vhs\Logger;
use vhs\loggers\SilentLogger;

class InMemoryEngine extends Engine {
    private $keyIncrementors = array();
    private $datastore = array();
    private $logger;
    private $generator;

    public static function DateFormat() { return "Y-m-d H:i:s"; }

    public function __construct() {
        $this->logger = new SilentLogger();

        $this->generator = new InMemoryGenerator();
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

    public function scalar(QuerySelect $query) {

        $this->logger->log("scalar: ");

        $record = $this->select($query);

        if(sizeof($record) <> 1)
            return null;
        else
            return $record[$query->columns[0]->name];
    }

    public function select(QuerySelect $query)
    {
        $this->logger->log("select " . $query->table->name . " " . implode(", ", $query->columns->names()) . " " . $query->where);

        if(!array_key_exists($query->table->name, $this->datastore))
            return array();

        $match = (!is_null($query->where)) ? $query->where->generate($this->generator) : function() { return true; };

        if(isset($orderBy) || isset($limit))
            throw new \Exception("TODO implement OrderBy and limit for InMemoryEngine");

        $results = array();

        $cols = array();

        foreach($query->columns->all() as $column)
            array_push($cols, $column->name);

        foreach($this->datastore[$query->table->name] as $row) {
            if ($match($row)) {
                array_push(
                    $results,
                    array_intersect_key($row, array_fill_keys($cols, false))
                );
            }
        }

        $this->logger->log(var_export($results, true));

        return $results;
    }

    public function delete(QueryDelete $query) {
        $this->logger->log("delete " . $query->table->name . " " . $query->where);
        if(!array_key_exists($query->table->name, $this->datastore))
            return false;

        $match = (!is_null($query->where)) ? $query->where->generate($this->generator) : function($item) { return true; };

        foreach($this->datastore[$query->table->name] as $key => $row) {
            if ($match($row)) {
                unset($this->datastore[$query->table->name][$key]);
            }
        }

        return true;
    }

    public function insert(QueryInsert $query) {
        $this->logger->log("insert " . $query->table->name . " " . var_export($query->values, true));
        if(!array_key_exists($query->table->name, $this->datastore))
            $this->datastore[$query->table->name] = array();

        $pks = array();

        foreach($query->table->getPrimaryKeys() as $pk) {
            if(!array_key_exists($pk->column->name, $query->values)) {
                $key = $query->table->name . "." . $pk->column->name;
                if(!array_key_exists($key, $this->keyIncrementors))
                    $this->keyIncrementors[$key] = 0;
                $this->keyIncrementors[$key] += 1;
                $pks[$pk->column->name] = $query->values[$pk->column->name] = $this->keyIncrementors[$key];
            }
        }

        array_push($this->datastore[$query->table->name], $query->values);

        if(count($pks) == 1)
            return array_values($pks)[0];

        return $pks;
    }

    public function update(QueryUpdate $query) {
        $this->logger->log("update " . $query->table->name . " " . var_export($query->values, true) . " " . $query->where);
        if(!array_key_exists($query->table->name, $this->datastore))
            return false;

        $match = (!is_null($query->where)) ? $query->where->generate($this->generator) : function($item) { return true; };

        foreach($this->datastore[$query->table->name] as $key => $row) {
            if ($match($row)) {
                foreach($query->values as $column => $value) {
                    $this->datastore[$query->table->name][$key][$column] = $value;
                }
            }
        }

        return true;
    }

    public function count(QueryCount $query) {
        $this->logger->log("count " . $query->table->name . " " . $query->where);
        if(!array_key_exists($query->table->name, $this->datastore))
            return false;

        $match = (!is_null($query->where)) ? $query->where->generate($this->generator) : function($item) { return true; };

        if(isset($orderBy) || isset($limit))
            throw new \Exception("TODO implement OrderBy and limit for InMemoryEngine");

        $count = 0;

        foreach($this->datastore[$query->table->name] as $row)
            if ($match($row)) $count += 1;

        return $count;
    }

    public function exists(QuerySelect $query) {
        $this->logger->log("exists: ");
        return $this->count($query) > 0;
    }

    public function arbitrary($command) {
        return false;
    }
}