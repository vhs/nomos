<?php

namespace app\services;

use app\contracts\IStripeEventService1;
use app\domain\StripeEvent;

use vhs\services\Service;

class StripeEventService extends Service implements IStripeEventService1 {

    public function GetAll() {
        return StripeEvent::findAll();
    }
    public function Get($id) {
        return StripeEvent::find($id);
    }

    public function ListRecords($page, $size, $columns, $order, $filters) {
        return StripeEvent::page($page, $size, $columns, $order, $filters);
    }

    public function CountRecords($filters)
    {
        return StripeEvent::count($filters);
    }
}
