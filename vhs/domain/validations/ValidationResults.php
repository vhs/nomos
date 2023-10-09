<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:41 PM
 */

namespace vhs\domain\validations;

class ValidationResults {
    private $failures = [];

    /**
     * @param ValidationFailure $failure
     */
    public function add(ValidationFailure $failure) {
        array_push($this->failures, $failure);
    }

    /**
     * @return bool
     */
    public function isSuccess() {
        return sizeof($this->failures) == 0;
    }

    /**
     * @return ValidationFailure[]
     */
    public function getFailures() {
        return $this->failures;
    }
}
