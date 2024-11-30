<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:39 PM.
 */

namespace vhs\database\types;

class TypeInt extends Type {
    public function covertType(ITypeConverter $converter, $value = null) {
        return $converter->convertInt($this, $value);
    }

    public function generateType(ITypeGenerator $generator, $value = null) {
        return $generator->generateInt($this, $value);
    }
}
