<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/18/2015
 * Time: 5:06 PM.
 */

namespace vhs\database\types;

use vhs\database\IConverter;

/** @typescript */
interface ITypeConverter extends IConverter {
    /**
     * convertBool.
     *
     * @param \vhs\database\types\TypeBool $type
     * @param bool|null                    $value
     *
     * @return bool|null
     */
    public function convertBool(TypeBool $type, $value = null);

    /**
     * convertDate.
     *
     * @param \vhs\database\types\TypeDate $type
     * @param string|null                  $value
     *
     * @return string|null
     */
    public function convertDate(TypeDate $type, $value = null);

    /**
     * convertDateTime.
     *
     * @param \vhs\database\types\TypeDateTime $type
     * @param string|null                      $value
     *
     * @return string|null
     */
    public function convertDateTime(TypeDateTime $type, $value = null);

    /**
     * convertEnum.
     *
     * @param \vhs\database\types\TypeEnum $type
     * @param string|null                  $value
     *
     * @return string|null
     */
    public function convertEnum(TypeEnum $type, $value = null);

    /**
     * convertFloat.
     *
     * @param \vhs\database\types\TypeFloat $type
     * @param float|null                    $value
     *
     * @return float|null
     */
    public function convertFloat(TypeFloat $type, $value = null);

    /**
     * convertInt.
     *
     * @param \vhs\database\types\TypeInt $type
     * @param int|null                    $value
     *
     * @return int|null
     */
    public function convertInt(TypeInt $type, $value = null);

    /**
     * convertString.
     *
     * @param \vhs\database\types\TypeString $type
     * @param string|null                    $value
     *
     * @return string|null
     */
    public function convertString(TypeString $type, $value = null);

    /**
     * convertText.
     *
     * @param \vhs\database\types\TypeText $type
     * @param string|null                  $value
     *
     * @return string|null
     */
    public function convertText(TypeText $type, $value = null);
}
