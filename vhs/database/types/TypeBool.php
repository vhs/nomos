<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:39 PM
 */

namespace vhs\database\types;

class TypeBool extends Type {
    public function generateType(ITypeGenerator $generator, $value = null) {
        return $generator->generateBool($this, $value);
    }

    public function covertType(ITypeConverter $converter, $value = null) {
        return $converter->convertBool($this, $value);
    }
}
