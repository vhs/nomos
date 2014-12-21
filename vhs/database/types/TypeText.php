<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:39 PM
 */

namespace vhs\database\types;


class TypeText extends Type {

    public function generateType(ITypeGenerator $generator) {
        return $generator->generateText($this);
    }
}