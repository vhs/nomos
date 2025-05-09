<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 6:16 PM.
 */

namespace vhs\database\engines\memory;

use vhs\database\Engine;
use vhs\database\queries\QueryCount;
use vhs\database\queries\QueryDelete;
use vhs\database\queries\QueryInsert;
use vhs\database\queries\QuerySelect;
use vhs\database\queries\QueryUpdate;
use vhs\Logger;
use vhs\loggers\SilentLogger;

/** @typescript */
class InMemoryEngine extends Engine {
    /**
     * datastore.
     *
     * @var array<mixed,mixed>
     */
    private $datastore = [];

    /**
     * generator.
     *
     * @var mixed
     */
    private $generator;

    /**
     * keyIncrementors.
     *
     * @var array<string,int>
     */
    private $keyIncrementors = [];

    /**
     * logger.
     *
     * @var \vhs\Logger
     */
    private $logger;

    /**
     * __construct.
     *
     * @return void
     */
    public function __construct() {
        $this->logger = new SilentLogger();

        $this->generator = new InMemoryGenerator();
    }

    /**
     * connect.
     *
     * @return bool
     */
    public function connect() {
        return true; //if we can't "connect" to memory but got this far, I don't know whatever
    }

    /**
     * disconnect.
     *
     * @return bool
     */
    public function disconnect() {
        $this->keyIncrementors = [];
        $this->datastore = [];
        $this->logger->log('disconnected');

        return true; // ha
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
     * @return bool
     */
    public function arbitrary($command) {
        return false;
    }

    /**
     * count.
     *
     * @param \vhs\database\queries\QueryCount $query
     *
     * @return bool|int
     */
    public function count(QueryCount $query) {
        $this->logger->log('count ' . $query->table->name . ' ' . $query->where);
        if (!array_key_exists($query->table->name, $this->datastore)) {
            return false;
        }

        $match = !is_null($query->where)
            ? $query->where->generate($this->generator)
            : function ($item) {
                return true;
            };

        // TODO currently not in use, always false: remove or implement
        // if (isset($orderBy) || isset($limit)) {
        //     throw new \Exception('TODO implement OrderBy and limit for InMemoryEngine');
        // }

        $count = 0;

        foreach ($this->datastore[$query->table->name] as $row) {
            if ($match($row)) {
                $count += 1;
            }
        }

        return $count;
    }

    /**
     * delete.
     *
     * @param \vhs\database\queries\QueryDelete $query
     *
     * @return bool
     */
    public function delete(QueryDelete $query) {
        $this->logger->log('delete ' . $query->table->name . ' ' . $query->where);
        if (!array_key_exists($query->table->name, $this->datastore)) {
            return false;
        }

        $match = !is_null($query->where)
            ? $query->where->generate($this->generator)
            : function ($item) {
                return true;
            };

        foreach ($this->datastore[$query->table->name] as $key => $row) {
            if ($match($row)) {
                unset($this->datastore[$query->table->name][$key]);
            }
        }

        return true;
    }

    /**
     * exists.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @return bool
     */
    public function exists(QuerySelect $query) {
        $this->logger->log('exists: ');

        return $this->count(new QueryCount($query->table, $query->where, $query->orderBy, $query->limit, $query->offset)) > 0;
    }

    /**
     * insert.
     *
     * @param \vhs\database\queries\QueryInsert $query
     *
     * @return mixed
     */
    public function insert(QueryInsert $query) {
        $this->logger->log('insert ' . $query->table->name . ' ' . var_export($query->values, true));
        if (!array_key_exists($query->table->name, $this->datastore)) {
            $this->datastore[$query->table->name] = [];
        }

        $pks = [];

        foreach ($query->table->getPrimaryKeys() as $pk) {
            if (!array_key_exists($pk->column->name, $query->values)) {
                $key = $query->table->name . '.' . $pk->column->name;
                if (!array_key_exists($key, $this->keyIncrementors)) {
                    $this->keyIncrementors[$key] = 0;
                }
                $this->keyIncrementors[$key] += 1;
                $pks[$pk->column->name] = $query->values[$pk->column->name] = $this->keyIncrementors[$key];
            }
        }

        array_push($this->datastore[$query->table->name], $query->values);

        if (count($pks) == 1) {
            return array_values($pks)[0];
        }

        return $pks;
    }

    /**
     * scalar.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @return mixed
     */
    public function scalar(QuerySelect $query) {
        $this->logger->log('scalar: ');

        $record = $this->select($query);

        if (sizeof($record) != 1) {
            return null;
        } else {
            return $record[$query->columns[0]->name];
        }
    }

    /**
     * select.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @return mixed
     */
    public function select(QuerySelect $query) {
        $this->logger->log('select ' . $query->table->name . ' ' . implode(', ', $query->columns->names()) . ' ' . $query->where);

        if (!array_key_exists($query->table->name, $this->datastore)) {
            return [];
        }

        $match = !is_null($query->where)
            ? $query->where->generate($this->generator)
            : function () {
                return true;
            };

        // TODO currently not in use, always false: remove or implement
        // if (isset($orderBy) || isset($limit)) {
        //     throw new \Exception('TODO implement OrderBy and limit for InMemoryEngine');
        // }

        $results = [];

        $cols = [];

        foreach ($query->columns->all() as $column) {
            array_push($cols, $column->name);
        }

        foreach ($this->datastore[$query->table->name] as $row) {
            if ($match($row)) {
                array_push($results, array_intersect_key($row, array_fill_keys($cols, false)));
            }
        }

        $this->logger->log(var_export($results, true));

        return $results;
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
     * @return bool
     */
    public function update(QueryUpdate $query) {
        $this->logger->log('update ' . $query->table->name . ' ' . var_export($query->values, true) . ' ' . $query->where);
        if (!array_key_exists($query->table->name, $this->datastore)) {
            return false;
        }

        $match = !is_null($query->where)
            ? $query->where->generate($this->generator)
            : function ($item) {
                return true;
            };

        foreach ($this->datastore[$query->table->name] as $key => $row) {
            if ($match($row)) {
                foreach ($query->values as $column => $value) {
                    $this->datastore[$query->table->name][$key][$column] = $value;
                }
            }
        }

        return true;
    }
}
