<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:11 PM
 */

namespace vhs\database;


use vhs\database\wheres\Where;

class On extends Element {

    /** @var Where */
    public $where;

    public function __construct(Where $where) {
        $this->where = $where;
    }

    public function __updateTable(Table &$table) {
        $this->where->__updateTable($table);
    }

    public static function Where(Where $where) {
        return new On($where);
    }

    /**
     * @param IGenerator $generator
     * @param null $value
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var IOnGenerator $generator */
        return $this->generateOn($generator);
    }

    public function generateOn(IOnGenerator $generator) {
        return $generator->generateOn($this);
    }
}