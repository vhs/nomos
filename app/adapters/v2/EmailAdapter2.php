<?php

namespace app\adapters\v2;

use app\domain\EmailTemplate;
use app\exceptions\InvalidInputException;
use vhs\Loggington;

class EmailAdapter2 extends Loggington {
    /**
     * Send the email.
     *
     * @param mixed $recipients
     * @param mixed $subject
     * @param mixed $template
     * @param mixed $context
     *
     * @throws \app\exceptions\InvalidInputException
     *
     * @return bool
     */
    public function Email($recipients, $subject, $template, $context): bool {
        $generated = EmailTemplate::generate($template, $context);

        if (is_null($generated)) {
            throw new InvalidInputException('Unable to load e-mail template');
        }

        if (is_null($subject)) {
            $subject = $generated['subject'];
        }

        return \vhs\gateways\Engine::getInstance()
            ->getDefaultGateway('messages', 'email')
            ->sendRichEmail($recipients, $subject, $generated['txt'], $generated['html']);
    }
}
