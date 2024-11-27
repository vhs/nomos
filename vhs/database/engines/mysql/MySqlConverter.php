<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/18/2015
 * Time: 5:14 PM
 */

namespace vhs\database\engines\mysql;

use vhs\database\types\ITypeConverter;
use vhs\database\types\TypeBool;
use vhs\database\types\TypeDate;
use vhs\database\types\TypeDateTime;
use vhs\database\types\TypeEnum;
use vhs\database\types\TypeFloat;
use vhs\database\types\TypeInt;
use vhs\database\types\TypeString;
use vhs\database\types\TypeText;

class MySqlConverter implements ITypeConverter {
    public function convertBool(TypeBool $type, $value = null) {
        if (is_null($value)) {
            if (!$type->nullable) {
                return $type->default;
            } else {
                return null;
            }
        }

        return boolval($value);
    }

    public function convertInt(TypeInt $type, $value = null) {
        if (is_null($value)) {
            if (!$type->nullable) {
                return $type->default;
            } else {
                return null;
            }
        }

        return intval($value);
    }

    public function convertFloat(TypeFloat $type, $value = null) {
        if (is_null($value)) {
            if (!$type->nullable) {
                return $type->default;
            } else {
                return null;
            }
        }

        return floatval($value);
    }

    public function convertString(TypeString $type, $value = null) {
        if (is_null($value)) {
            if (!$type->nullable) {
                return $type->default;
            } else {
                return null;
            }
        }

        return (string) $value;
    }

    public function convertText(TypeText $type, $value = null) {
        if (is_null($value)) {
            if (!$type->nullable) {
                return $type->default;
            } else {
                return null;
            }
        }

        return (string) $value;
    }

    public function convertDate(TypeDate $type, $value = null) {
        if (is_null($value)) {
            if (!$type->nullable) {
                return $type->default;
            } else {
                return null;
            }
        }

        return date('Y-m-d', strtotime(str_replace('-', '/', $value)));
    }

    public function convertDateTime(TypeDateTime $type, $value = null) {
        if (is_null($value)) {
            if (!$type->nullable) {
                return $type->default;
            } else {
                return null;
            }
        }

        return date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $value)));
    }

    public function convertEnum(TypeEnum $type, $value = null) {
        if (is_null($value)) {
            if (!$type->nullable) {
                return $type->default;
            } else {
                return null;
            }
        }

        if (in_array($value, $type->values)) {
            return (string) $value;
        } else {
            throw new \Exception("Invalid enum value {$value} does not exist");
        }
    }
}
