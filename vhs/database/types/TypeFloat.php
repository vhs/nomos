<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:40 PM
 */

namespace vhs\database\types;

class TypeFloat extends Type {
    public function covertType(ITypeConverter $converter, $value = null) {
        return $converter->convertFloat($this, $value);
    }

    public function generateType(ITypeGenerator $generator, $value = null) {
        return $generator->generateFloat($this, $value);
    }
}
