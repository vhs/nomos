<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:11 PM.
 */

namespace vhs\database;

use vhs\database\wheres\Where;

/** @typescript */
class On extends Element {
    /** @var \vhs\database\wheres\Where */
    public $where;

    /**
     * __construct.
     *
     * @param \vhs\database\wheres\Where $where
     *
     * @return void
     */
    public function __construct(Where $where) {
        $this->where = $where;
    }

    /**
     * Where.
     *
     * @param \vhs\database\wheres\Where $where
     *
     * @return \vhs\database\On
     */
    public static function Where(Where $where) {
        return new On($where);
    }

    /**
     * @param \vhs\database\IOnGenerator $generator
     * @param mixed                      $value
     *
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        return $this->generateOn($generator);
    }

    /**
     * generateOn.
     *
     * @param \vhs\database\IOnGenerator $generator
     *
     * @return mixed
     */
    public function generateOn(IOnGenerator $generator) {
        return $generator->generateOn($this);
    }

    /**
     * __updateTable.
     *
     * @param \vhs\database\Table $table
     *
     * @return void
     */
    public function __updateTable(Table &$table) {
        $this->where->__updateTable($table);
    }
}
