<?php

namespace vhs\gateways\interfaces;

interface IMessagesEmailGateway extends IGateway {
    /**
     * sendRichEmail.
     *
     * @param string|string[] $to
     * @param string          $subject
     * @param string          $textContent
     * @param string          $htmlContent
     *
     * @return bool
     */
    public function sendRichEmail(string|array $to, string $subject, string $textContent, string $htmlContent): bool;

    /**
     * sendSimpleEmail.
     *
     * @param string|string[] $to
     * @param string          $subject
     * @param string          $textContent
     *
     * @return bool
     */
    public function sendSimpleEmail(string|array $to, string $subject, string $textContent): bool;
}
