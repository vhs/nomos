<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 4:17 PM.
 */

namespace vhs\database\constraints;

use vhs\database\IGenerator;

interface IConstraintGenerator extends IGenerator {
    public function generateForeignKey(ForeignKey $constraint);

    public function generatePrimaryKey(PrimaryKey $constraint);
}
