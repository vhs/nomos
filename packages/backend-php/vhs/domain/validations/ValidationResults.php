<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:41 PM.
 */

namespace vhs\domain\validations;

/** @typescript */
class ValidationResults {
    /**
     * failures.
     *
     * @var \vhs\domain\validations\ValidationFailure[]
     */
    private $failures = [];

    /**
     * add.
     *
     * @param \vhs\domain\validations\ValidationFailure $failure
     *
     * @return void
     */
    public function add(ValidationFailure $failure) {
        array_push($this->failures, $failure);
    }

    /**
     * getFailures.
     *
     * @return \vhs\domain\validations\ValidationFailure[]
     */
    public function getFailures() {
        return $this->failures;
    }

    /**
     * isSuccess.
     *
     * @return bool
     */
    public function isSuccess() {
        return sizeof($this->failures) == 0;
    }
}
