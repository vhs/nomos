<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:14 PM
 */

namespace vhs\database;


abstract class OnGenerator implements IGenerator {
    abstract public function generateOn(On $on);
}