<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/08/2015
 * Time: 12:56 AM
 */

namespace app\monitors;

use app\domain\Membership;
use app\domain\Payment;
use app\domain\User;
use app\processors\PaymentProcessor;
use app\security\PasswordUtil;
use app\services\EmailService;
use app\services\UserService;
use Aws\CloudFront\Exception\Exception;
use DateTime;
use vhs\Logger;
use vhs\monitors\Monitor;

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
