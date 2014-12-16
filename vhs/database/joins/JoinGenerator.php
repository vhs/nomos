<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:00 PM
 */

namespace vhs\database\joins;


use vhs\database\IGenerator;

abstract class JoinGenerator implements IGenerator {
    abstract public function generateLeft(JoinLeft $join);
    abstract public function generateRight(JoinRight $join);
    abstract public function generateOuter(JoinOuter $join);
    abstract public function generateInner(JoinInner $join);
    abstract public function generateCross(JoinCross $join);
}