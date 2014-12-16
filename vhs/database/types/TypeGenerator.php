<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:26 PM
 */

namespace vhs\database\types;


use vhs\database\IGenerator;

abstract class TypeGenerator implements IGenerator {

    abstract public function generateBool(TypeBool $type);
    abstract public function generateInt(TypeInt $type);
    abstract public function generateFloat(TypeFloat $type);
    abstract public function generateString(TypeString $type);
    abstract public function generateText(TypeText $type);
    abstract public function generateDate(TypeDate $type);
    abstract public function generateDateTime(TypeDateTime $type);
    abstract public function generateEnum(TypeEnum $type);
}