<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:26 PM
 */

namespace vhs\database\types;


use vhs\database\IGenerator;

interface ITypeGenerator extends IGenerator {

    public function generateBool(TypeBool $type, $value = null);
    public function generateInt(TypeInt $type, $value = null);
    public function generateFloat(TypeFloat $type, $value = null);
    public function generateString(TypeString $type, $value = null);
    public function generateText(TypeText $type, $value = null);
    public function generateDate(TypeDate $type, $value = null);
    public function generateDateTime(TypeDateTime $type, $value = null);
    public function generateEnum(TypeEnum $type, $value = null);
}