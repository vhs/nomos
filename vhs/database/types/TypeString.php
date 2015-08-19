<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:39 PM
 */

namespace vhs\database\types;


class TypeString extends Type {

    public $length;

    public function __construct($nullable = true, $default = null, $length = 255) {
        parent::__construct($nullable, $default);

        $this->length = $length;
    }

    public function generateType(ITypeGenerator $generator, $value = null) {
        return $generator->generateString($this, $value);
    }

    public function covertType(ITypeConverter $converter, $value = null) {
        return $converter->convertString($this, $value);
    }
}