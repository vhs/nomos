<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/18/2015
 * Time: 5:05 PM
 */

namespace vhs\database;


interface IConvertable
{
    /**
     * @param IConverter $converter
     * @param mixed $value
     * @return mixed
     */
    function convert(IConverter $converter, $value = null);
}