<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:14 PM
 */

namespace vhs\database;

interface IOnGenerator extends IGenerator {
    public function generateOn(On $on);
}
