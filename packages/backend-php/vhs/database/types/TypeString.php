<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:39 PM.
 */

namespace vhs\database\types;

/** @typescript */
class TypeString extends Type {
    /** @var int */
    public $length;

    /**
     * constructor.
     *
     * @param bool  $nullable
     * @param mixed $default
     * @param int   $length
     */
    public function __construct($nullable = true, $default = null, $length = 255) {
        parent::__construct($nullable, $default);

        $this->length = $length;
    }

    public function convertType(ITypeConverter $converter, $value = null) {
        return $converter->convertString($this, $value);
    }

    public function generateType(ITypeGenerator $generator, $value = null) {
        return $generator->generateString($this, $value);
    }
}
