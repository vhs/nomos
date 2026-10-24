<?php

namespace vhs\gateways\interfaces;

interface IGateway {
    public function health(): bool;
}
