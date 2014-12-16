<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:40 PM
 */

namespace vhs\database\types;


class TypeDateTime extends Type {

    public function generateType(TypeGenerator $generator) {
        return $generator->generateDateTime($this);
    }
}