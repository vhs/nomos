<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:16 PM
 */

namespace vhs\database;


use vhs\database\types\Type;

class Column implements IGeneratable {

    public $table;
    public $name;
    public $type;

    public function __construct(Table &$table, $name, Type $type) {
        $this->table = $table;
        $this->name = $name;
        $this->type = $type;
    }

    public function getAbsoluteName() {
        return $this->table->name .".". $this->name;
    }

    /**
     * @param IGenerator $generator
     * @return mixed
     */
    public function generate(IGenerator $generator) {
        /** @var ColumnGenerator $generator */
        return $this->generateColumn($generator);
    }

    public function generateColumn(ColumnGenerator $generator) {
        return $generator->generateColumn($this);
    }
}