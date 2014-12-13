<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 6:16 PM
 */

namespace vhs\database\engines;


use vhs\database\Engine;
use vhs\database\Where;
use vhs\Logger;
use vhs\loggers\SilentLogger;

class InMemoryEngine extends Engine {
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

    public function scalar($table, $column, Where $where = null) {
        $value = $this->select($table, array($column), $where);

        if(sizeof($value) <> 1)
            return null;
        else
            return $value[0];
    }

    public function select($table, $columns, Where $where = null) {
        if(!array_key_exists($table, $this->datastore))
            return null;

        $match = (!is_null($where)) ? $where->generate($this->whereGenerator) : function($item) { return true; };

        $results = array();

        foreach($this->datastore[$table] as $row) {
            if ($match($row)) {
                array_push(
                    $results,
                    array_intersect_key($row, array_fill_keys($columns, false))
                );
            }
        }

        return $results;
    }

    public function delete($table, Where $where = null) {
        if(!array_key_exists($table, $this->datastore))
            return false;

        $match = (!is_null($where)) ? $where->generate($this->whereGenerator) : function($item) { return true; };

        foreach($this->datastore[$table] as $key => $row) {
            if ($match($row)) {
                unset($this->datastore[$table][$key]);
            }
        }

        return true;
    }

    public function create($table, $data) {
        if(!array_key_exists($table, $this->datastore))
            $this->datastore[$table] = array();

        array_push($this->datastore[$table], $data);

        $index = sizeof($this->datastore[$table]) - 1;

        $this->datastore[$table][$index]["id"] = $index + 1; //TODO this is a hack assuming Domain objects will always name their Pk columns as "id"

        return $index + 1;
    }

    public function update($table, $data, Where $where = null) {
        if(!array_key_exists($table, $this->datastore))
            return false;

        $match = (!is_null($where)) ? $where->generate($this->whereGenerator) : function($item) { return true; };

        foreach($this->datastore[$table] as $key => $row) {
            if ($match($row)) {
                foreach($data as $column => $value) {
                    $this->datastore[$table][$key][$column] = $value;
                }
            }
        }

        return true;
    }

    public function count($table, Where $where = null) {
        if(!array_key_exists($table, $this->datastore))
            return false;

        $match = (!is_null($where)) ? $where->generate($this->whereGenerator) : function($item) { return true; };

        $count = 0;

        foreach($this->datastore[$table] as $row)
            if ($match($row)) $count += 1;

        return $count;
    }

    public function exists($table, Where $where = null) {
        return $this->count($table, $where) > 0;
    }

    public function arbitrary($command) {
        return false;
    }
}