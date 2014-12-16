<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:07 PM
 */

namespace vhs\database\joins;


class JoinCross extends Join {

    function generateJoin(JoinGenerator $generator) {
        return $generator->generateCross($this);
    }
}