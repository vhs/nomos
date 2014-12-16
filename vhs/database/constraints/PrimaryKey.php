<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 4:18 PM
 */

namespace vhs\database\constraints;


class PrimaryKey extends Constraint {

    public function generateConstraint(ConstraintGenerator $generator) {
        return $generator->generatePrimaryKey($this);
    }
}
