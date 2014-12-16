<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:06 PM
 */

namespace vhs\database\joins;


class JoinRight extends Join {

    function generateJoin(JoinGenerator $generator) {
        return $generator->generateRight($this);
    }
}