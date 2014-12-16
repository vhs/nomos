<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 4:17 PM
 */

namespace vhs\database\constraints;


use vhs\database\IGenerator;

abstract class ConstraintGenerator implements IGenerator {
    abstract public function generatePrimaryKey(PrimaryKey $constraint);
    abstract public function generateForeignKey(ForeignKey $constraint);
}