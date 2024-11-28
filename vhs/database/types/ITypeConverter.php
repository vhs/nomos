<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/18/2015
 * Time: 5:06 PM
 */

namespace vhs\database\types;

use vhs\database\IConverter;

interface ITypeConverter extends IConverter {
    public function convertBool(TypeBool $type, $value = null);

    public function convertDate(TypeDate $type, $value = null);

    public function convertDateTime(TypeDateTime $type, $value = null);

    public function convertEnum(TypeEnum $type, $value = null);

    public function convertFloat(TypeFloat $type, $value = null);

    public function convertInt(TypeInt $type, $value = null);

    public function convertString(TypeString $type, $value = null);

    public function convertText(TypeText $type, $value = null);
}
