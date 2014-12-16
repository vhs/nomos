<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:39 PM
 */

namespace vhs\database\types;


class TypeDate extends Type {

    public function generateType(TypeGenerator $generator) {
        return $generator->generateDate($this);
    }
}