<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:06 PM
 */

namespace vhs\database\joins;

class JoinRight extends Join {
    public function generateJoin(IJoinGenerator $generator) {
        return $generator->generateRight($this);
    }
}
