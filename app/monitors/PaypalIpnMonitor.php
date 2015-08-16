<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/08/2015
 * Time: 12:56 AM
 */

namespace app\monitors;

use app\domain\Ipn;
use vhs\Logger;
use vhs\monitors\Monitor;

class PaypalIpnMonitor extends Monitor {

    private $logger;

    public function Init(Logger $logger = null) {
        $this->logger = $logger;
        Ipn::onAnyCreated([$this, "handleCreated"]);
    }

    public function handleCreated($args)
    {
        $ipn = $args[0];

        if ($ipn->validation == "VERIFIED" && $ipn->payment_status == "COMPLETED") {
            //todo maybe do a hash or record the id of this $ipn record to mark it completed
            //todo create transaction, update user, etc

            $this->logger->log("We have a valid $ipn record, create a transaction, update users, etc");

        }
    }

}