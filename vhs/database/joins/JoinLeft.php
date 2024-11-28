<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:02 PM
 */

namespace vhs\database\joins;

class JoinLeft extends Join {
    public function generateJoin(IJoinGenerator $generator) {
        return $generator->generateLeft($this);
    }
}
