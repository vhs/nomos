<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/08/2015
 * Time: 12:56 AM
 */

namespace app\monitors;

use DateTime;
use vhs\Logger;
use app\domain\User;
use app\domain\Payment;
use vhs\monitors\Monitor;
use app\domain\Membership;
use app\services\UserService;
use app\security\PasswordUtil;
use app\services\EmailService;
use app\processors\PaymentProcessor;
use Aws\CloudFront\Exception\Exception;

class PaymentMonitor extends Monitor {
    /** @var PaymentProcessor */
    private $paymentProcessor;
    /** @var Logger */
    private $logger;

    public function Init(Logger &$logger = null) {
        $this->logger = $logger;
        $this->paymentProcessor = new PaymentProcessor($logger);

        Payment::onAnyCreated([$this, 'paymentCreated']);
    }

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
