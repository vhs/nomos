<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 12:20 PM.
 */

namespace vhs\database\joins;

use vhs\database\Element;
use vhs\database\IGenerator;
use vhs\database\On;
use vhs\database\Table;

/** @typescript */
abstract class Join extends Element {
    /** @var On */
    public $on;
    /** @var Table */
    public $table;

    public function __construct(Table $table, On $on) {
        $this->table = clone $table;
        $this->on = $on;
        $this->on->__updateTable($this->table);
    }

    public static function Cross(Table $table, On $on) {
        return new JoinCross($table, $on);
    }

    public static function Inner(Table $table, On $on) {
        return new JoinInner($table, $on);
    }

    public static function Left(Table $table, On $on) {
        return new JoinLeft($table, $on);
    }

    public static function Outer(Table $table, On $on) {
        return new JoinOuter($table, $on);
    }

    public static function Right(Table $table, On $on) {
        return new JoinRight($table, $on);
    }

    abstract public function generateJoin(IJoinGenerator $generator);

    public function generate(IGenerator $generator, $value = null) {
        /** @var IJoinGenerator $generator */
        return $this->generateJoin($generator);
    }

    public function __clone() {
        $this->on = clone $this->on;
    }

    public function __updateTable(Table &$table) {
        $this->table = $table;
        $this->on->__updateTable($table);
    }
}
