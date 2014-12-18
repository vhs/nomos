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

    public function generateBool(TypeBool $type);
    public function generateInt(TypeInt $type);
    public function generateFloat(TypeFloat $type);
    public function generateString(TypeString $type);
    public function generateText(TypeText $type);
    public function generateDate(TypeDate $type);
    public function generateDateTime(TypeDateTime $type);
    public function generateEnum(TypeEnum $type);
}