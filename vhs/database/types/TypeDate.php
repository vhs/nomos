<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:39 PM
 */

namespace vhs\database\types;

class TypeDate extends Type {
    public function generateType(ITypeGenerator $generator, $value = null) {
        return $generator->generateDate($this, $value);
    }

    public function covertType(ITypeConverter $converter, $value = null) {
        return $converter->convertDate($this, $value);
    }
}
