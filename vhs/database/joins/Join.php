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
    /**
     * on.
     *
     * @var \vhs\database\On
     */
    public $on;

    /**
     * table.
     *
     * @var \vhs\database\Table
     */
    public $table;

    /**
     * __construct.
     *
     * @param \vhs\database\Table $table
     * @param \vhs\database\On    $on
     *
     * @return void
     */
    public function __construct(Table $table, On $on) {
        $this->table = clone $table;
        $this->on = $on;
        $this->on->__updateTable($this->table);
    }

    /**
     * Cross.
     *
     * @param \vhs\database\Table $table
     * @param \vhs\database\On    $on
     *
     * @return \vhs\database\joins\JoinCross
     */
    public static function Cross(Table $table, On $on) {
        return new JoinCross($table, $on);
    }

    /**
     * Inner.
     *
     * @param \vhs\database\Table $table
     * @param \vhs\database\On    $on
     *
     * @return \vhs\database\joins\JoinInner
     */
    public static function Inner(Table $table, On $on) {
        return new JoinInner($table, $on);
    }

    /**
     * Left.
     *
     * @param \vhs\database\Table $table
     * @param \vhs\database\On    $on
     *
     * @return \vhs\database\joins\JoinLeft
     */
    public static function Left(Table $table, On $on) {
        return new JoinLeft($table, $on);
    }

    /**
     * Outer.
     *
     * @param \vhs\database\Table $table
     * @param \vhs\database\On    $on
     *
     * @return \vhs\database\joins\JoinOuter
     */
    public static function Outer(Table $table, On $on) {
        return new JoinOuter($table, $on);
    }

    /**
     * Right.
     *
     * @param \vhs\database\Table $table
     * @param \vhs\database\On    $on
     *
     * @return \vhs\database\joins\JoinRight
     */
    public static function Right(Table $table, On $on) {
        return new JoinRight($table, $on);
    }

    /**
     * generateJoin.
     *
     * @param \vhs\database\joins\IJoinGenerator $generator
     *
     * @return mixed
     */
    abstract public function generateJoin(IJoinGenerator $generator);

    /**
     * generate.
     *
     * @param \vhs\database\IGenerator $generator
     * @param mixed                    $value
     *
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var IJoinGenerator $generator */
        return $this->generateJoin($generator);
    }

    /**
     * __clone.
     *
     * @return void
     */
    public function __clone() {
        $this->on = clone $this->on;
    }

    /**
     * __updateTable.
     *
     * @param \vhs\database\Table $table
     *
     * @return void
     */
    public function __updateTable(Table &$table) {
        $this->table = $table;
        $this->on->__updateTable($table);
    }
}
