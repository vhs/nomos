<?php

namespace app\dto;

/** @typescript */
class ServiceResponse {
    public string $msg;
    public bool $success;

    public function __construct(string $msg, bool $success = false) {
        $this->success = $success;
        $this->msg = $msg;
    }
}
