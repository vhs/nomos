<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/18/2015
 * Time: 5:14 PM.
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

/** @typescript */
class MySqlConverter implements ITypeConverter {
    /**
     * convertBool.
     *
     * @param \vhs\database\types\TypeBool $type
     * @param bool                         $value
     *
     * @return bool|null
     */
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

    /**
     * convertDate.
     *
     * @param \vhs\database\types\TypeDate $type
     * @param string|null                  $value
     *
     * @return string|null
     */
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

    /**
     * convertDateTime.
     *
     * @param \vhs\database\types\TypeDateTime $type
     * @param string|null                      $value
     *
     * @return string|null
     */
    public function convertDateTime(TypeDateTime $type, $value = null) {
        if (is_null($value) || empty($value)) {
            if (!$type->nullable) {
                return $type->default;
            } else {
                return null;
            }
        }

        return date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $value)));
    }

    /**
     * convertEnum.
     *
     * @param \vhs\database\types\TypeEnum $type
     * @param string|null                  $value
     *
     * @return string|null
     */
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

    /**
     * convertFloat.
     *
     * @param \vhs\database\types\TypeFloat $type
     * @param float|null                    $value
     *
     * @return float|null
     */
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

    /**
     * convertInt.
     *
     * @param \vhs\database\types\TypeInt $type
     * @param int|null                    $value
     *
     * @return int|null
     */
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

    /**
     * convertString.
     *
     * @param \vhs\database\types\TypeString $type
     * @param string|null                    $value
     *
     * @return string|null
     */
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

    /**
     * convertText.
     *
     * @param \vhs\database\types\TypeText $type
     * @param string|null                  $value
     *
     * @return string|null
     */
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
}
