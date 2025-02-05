<?php

namespace app\dto;

/** @typescript */
class ServiceResponseErrorInvalidToken extends ServiceResponseError {
    public function __construct() {
        parent::__construct('Invalid Token');
    }
}
