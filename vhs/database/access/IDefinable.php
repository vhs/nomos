<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/8/2016
 * Time: 1:38 PM
 */

namespace vhs\database\access;


interface IDefinable
{
    /**
     * @return AccessDefinition
     */
    public function define();
}
