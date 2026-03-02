<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:40 PM.
 */

namespace vhs\database\types;

/** @typescript */
class TypeDateTime extends Type {
    public function convertType(ITypeConverter $converter, $value = null) {
        return $converter->convertDateTime($this, $value);
    }

    public function generateType(ITypeGenerator $generator, $value = null) {
        return $generator->generateDateTime($this, $value);
    }
}
