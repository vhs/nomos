<?php

namespace app\dto;

/** @typescript */
class ServiceResponseErrorUserNotFoundByEmailAddress extends ServiceResponseError {
    public function __construct() {
        parent::__construct('Unable to find a user by that e-mail address');
    }
}
