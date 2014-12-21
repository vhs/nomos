<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 12:20 PM
 */

namespace vhs\database\joins;


use vhs\database\IGeneratable;
use vhs\database\IGenerator;
use vhs\database\On;
use vhs\database\Table;

abstract class Join implements IGeneratable {

    public $table;
    public $on;

    public function __construct(Table $table, On $on) {
        $this->$table = $table;
    }

    public static function Left(Table $table, On $on) {
        return new JoinLeft($table, $on);
    }

    public static function Right(Table $table, On $on) {
        return new JoinRight($table, $on);
    }

    public static function Inner(Table $table, On $on) {
        return new JoinInner($table, $on);
    }

    public static function Outer(Table $table, On $on) {
        return new JoinOuter($table, $on);
    }

    public static function Cross(Table $table, On $on) {
        return new JoinCross($table, $on);
    }

    public function generate(IGenerator $generator) {
        /** @var IJoinGenerator $generator */
        return $this->generateJoin($generator);
    }

    abstract function generateJoin(IJoinGenerator $generator);
}