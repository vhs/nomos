<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:40 PM
 */

namespace vhs\database\types;

class TypeDateTime extends Type {
    public function generateType(ITypeGenerator $generator, $value = null) {
        return $generator->generateDateTime($this, $value);
    }

    public function covertType(ITypeConverter $converter, $value = null) {
        return $converter->convertDateTime($this, $value);
    }
}
