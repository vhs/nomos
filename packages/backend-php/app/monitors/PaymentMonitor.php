<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/08/2015
 * Time: 12:56 AM.
 */

namespace app\monitors;

use app\domain\Payment;
use app\processors\PaymentProcessor;
use vhs\Logger;
use vhs\monitors\Monitor;

/** @typescript */
class PaymentMonitor extends Monitor {
    /** @var Logger */
    private $logger;

    /** @var PaymentProcessor */
    private $paymentProcessor;

    /**
     * Init.
     *
     * @param \vhs\Logger|null $logger
     *
     * @return void
     */
    public function Init(?Logger &$logger = null) {
        $this->logger = $logger;
        $this->paymentProcessor = new PaymentProcessor($logger);

        Payment::onAnyCreated([$this, 'paymentCreated']);
    }

    /**
     * paymentCreated.
     *
     * @param mixed $args
     *
     * @return void
     */
    public function paymentCreated($args) {
        try {
            $this->paymentProcessor->paymentCreated($args[0]->id);
        } catch (\Exception $ex) {
            if (!is_null($this->logger)) {
                $this->logger->log('[PaymentMonitor] ' . $ex->getMessage() . ' ' . $ex->getTraceAsString());
            }
        }
    }
}
