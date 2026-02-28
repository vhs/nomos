<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:07 PM.
 */

namespace vhs\database\joins;

/** @typescript */
class JoinOuter extends Join {
    public function generateJoin(IJoinGenerator $generator) {
        return $generator->generateOuter($this);
    }
}
