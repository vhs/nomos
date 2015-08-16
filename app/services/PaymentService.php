<?php

namespace app\services;


use app\contracts\IPaymentService1;
use app\domain\Payment;
use app\schema\SettingsSchema;
use vhs\database\Database;
use vhs\services\Service;

class PaymentService extends Service implements IPaymentService1 {

    public function GetPaginated($offset, $limit) {
        $payments = Payment::findAll();
        print_r($payments);die();
        return array_slice($payments, $offset, $limit);
    }
}