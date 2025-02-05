<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:43 PM.
 */

namespace vhs\domain\validations;

/** @typescript */
class ValidationException extends \Exception {
    private $results;

    public function __construct(ValidationResults $results) {
        $this->results = $results;

        $message = 'Validation failed:';

        foreach ($this->results->getFailures() as $failure) {
            $message .= "\t\n" . $failure->getMessage();
        }

        parent::__construct($message);
    }

    /**
     * @return ValidationResults
     */
    public function getResults() {
        return $this->results;
    }
}
