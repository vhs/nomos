<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:07 PM
 */

namespace vhs\database\joins;


class JoinOuter extends Join {

    function generateJoin(IJoinGenerator $generator) {
        return $generator->generateOuter($this);
    }
}