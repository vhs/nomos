<?php

namespace app\monitors;


use app\domain\StripeEvent;
use app\domain\Payment;
use DateTime;
use vhs\Logger;
use vhs\monitors\Monitor;

class StripeEventMonitor extends Monitor {

    /** @var Logger */
    private $logger;

    public function Init(Logger &$logger = null) {
        $this->logger = &$logger;
        StripeEvent::onAnyCreated([$this, "handleCreated"]);
    }

    public function handleCreated($args)
    {
        /** @var StripeEvent $event */
        $event = $args[0];

        // TODO create a payment object for valid payments and handle failures with email notifications
    }
}
