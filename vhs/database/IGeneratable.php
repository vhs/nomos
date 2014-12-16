<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 12:33 PM
 */

namespace vhs\database;


interface IGeneratable {
    /**
     * @param IGenerator $generator
     * @return mixed
     */
    function generate(IGenerator $generator);
}