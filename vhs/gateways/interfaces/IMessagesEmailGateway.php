<?php

namespace vhs\gateways\interfaces;

interface IMessagesEmailGateway extends IGateway {
    public function sendRichEmail(string|array $to, string $subject, $textContent, $htmlContent): bool;

    public function sendSimpleEmail(string|array $to, string $subject, $textContent): bool;
}
