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
    public $serializable;

    public function __construct(Table &$table, $name, Type $type, $serializable = true) {
        $this->table = $table;
        $this->name = $name;
        $this->type = $type;
        $this->serializable = $serializable;
    }

    public function getAbsoluteName() {
        return $this->table->name .".". $this->name;
    }

    /**
     * @param IGenerator $generator
     * @return mixed
     */
    public function generate(IGenerator $generator) {
        /** @var IColumnGenerator $generator */
        return $this->generateColumn($generator);
    }

    public function generateColumn(IColumnGenerator $generator) {
        return $generator->generateColumn($this);
    }
}