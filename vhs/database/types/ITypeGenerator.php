<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:26 PM.
 */

namespace vhs\database\types;

use vhs\database\IGenerator;

/** @typescript */
interface ITypeGenerator extends IGenerator {
    /**
     * generateBool.
     *
     * @param \vhs\database\types\TypeBool $type
     * @param mixed                        $value
     *
     * @return mixed
     */
    public function generateBool(TypeBool $type, $value = null);

    /**
     * generateDate.
     *
     * @param \vhs\database\types\TypeDate $type
     * @param mixed                        $value
     *
     * @return mixed
     */
    public function generateDate(TypeDate $type, $value = null);

    /**
     * generateDateTime.
     *
     * @param \vhs\database\types\TypeDateTime $type
     * @param mixed                            $value
     *
     * @return mixed
     */
    public function generateDateTime(TypeDateTime $type, $value = null);

    /**
     * generateEnum.
     *
     * @param \vhs\database\types\TypeEnum $type
     * @param mixed                        $value
     *
     * @return mixed
     */
    public function generateEnum(TypeEnum $type, $value = null);

    /**
     * generateFloat.
     *
     * @param \vhs\database\types\TypeFloat $type
     * @param mixed                         $value
     *
     * @return mixed
     */
    public function generateFloat(TypeFloat $type, $value = null);

    /**
     * generateInt.
     *
     * @param \vhs\database\types\TypeInt $type
     * @param mixed                       $value
     *
     * @return mixed
     */
    public function generateInt(TypeInt $type, $value = null);

    /**
     * generateString.
     *
     * @param \vhs\database\types\TypeString $type
     * @param mixed                          $value
     *
     * @return mixed
     */
    public function generateString(TypeString $type, $value = null);

    /**
     * generateText.
     *
     * @param \vhs\database\types\TypeText $type
     * @param mixed                        $value
     *
     * @return mixed
     */
    public function generateText(TypeText $type, $value = null);
}
