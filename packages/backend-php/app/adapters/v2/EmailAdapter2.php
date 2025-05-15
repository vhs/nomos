<?php

namespace app\adapters\v2;

use app\domain\EmailTemplate;
use app\domain\User;
use app\exceptions\InvalidInputException;
use vhs\Loggington;

/**
 * EmailAdapter2.
 *
 * @method static \app\adapters\v2\EmailAdapter2 getInstance()
 */
class EmailAdapter2 extends Loggington {
    /**
     * Send the email.
     *
     * @param mixed       $recipients
     * @param mixed       $template
     * @param mixed       $context
     * @param string|null $subject
     *
     * @throws \app\exceptions\InvalidInputException
     *
     * @return bool
     */
    public function Email($recipients, $template, $context, $subject = null): bool {
        $generated = EmailTemplate::generate($template, $context);

        if (is_null($generated)) {
            throw new InvalidInputException('Unable to load e-mail template');
        }

        if (is_null($subject)) {
            $subject = $generated->subject;
        }

        return \vhs\gateways\Engine::getInstance()
            ->getDefaultGateway('messages', 'email')
            ->sendRichEmail($recipients, $subject, $generated->txt, $generated->html);
    }

    /**
     * Send the email.
     *
     * @param mixed       $template
     * @param mixed       $context
     * @param string|null $subject
     *
     * @throws \app\exceptions\InvalidInputException
     *
     * @return bool
     */
    public function EmailUser(User $user, $template, $context, $subject = null): bool {
        $generated = EmailTemplate::generate($template, $context);

        if (is_null($generated)) {
            throw new InvalidInputException('Unable to load e-mail template');
        }

        if (is_null($subject)) {
            $subject = $generated->subject;
        }

        return \vhs\gateways\Engine::getInstance()
            ->getDefaultGateway('messages', 'email')
            ->sendRichEmail($user->email, $subject, $generated->txt, $generated->html);
    }
}
