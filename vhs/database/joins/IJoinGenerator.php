<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:00 PM
 */

namespace vhs\database\joins;

use vhs\database\IGenerator;

interface IJoinGenerator extends IGenerator {
    public function generateCross(JoinCross $join);

    public function generateInner(JoinInner $join);

    public function generateLeft(JoinLeft $join);

    public function generateOuter(JoinOuter $join);

    public function generateRight(JoinRight $join);
}
