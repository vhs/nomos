<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 4:17 PM.
 */

namespace vhs\database\constraints;

use vhs\database\IGenerator;

/** @typescript */
interface IConstraintGenerator extends IGenerator {
    /**
     * generateForeignKey.
     *
     * @param \vhs\database\constraints\ForeignKey $constraint
     *
     * @return mixed
     */
    public function generateForeignKey(ForeignKey $constraint);

    /**
     * generatePrimaryKey.
     *
     * @param \vhs\database\constraints\PrimaryKey $constraint
     *
     * @return mixed
     */
    public function generatePrimaryKey(PrimaryKey $constraint);
}
