<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/19/2015
 * Time: 10:20 AM
 */

namespace vhs;


/**
 * Class Cloneable
 * This will do deep object cloning but will choke on self references
 * you've been warned
 * @package vhs
 */
trait Cloneable
{
    public function __clone() {
        foreach ($this as $key => $val) {
            if (is_object($val))
                $this->{$key} = clone $val;
            elseif (is_array($val))
                $this->{$key} = $this->__arrayCopy($val);
        }
    }

    final private function __arrayCopy(array $array) {
        $result = array();
        foreach ($array as $key => $val) {
            if (is_array($val))
                $result[$key] = $this->__arrayCopy($val);
            elseif (is_object($val))
                $result[$key] = clone $val;
            else
                $result[$key] = $val;
        }

        return $result;
    }
}
