<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:40 PM
 */

namespace vhs\database\types;


class TypeFloat extends Type {

    public function generateType(ITypeGenerator $generator) {
        return $generator->generateFloat($this);
    }
}