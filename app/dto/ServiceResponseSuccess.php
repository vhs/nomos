<?php

namespace app\dto;

/** @typescript */
class ServiceResponseSuccess extends ServiceResponse {
    public function __construct() {
        parent::__construct('', true);
    }
}
