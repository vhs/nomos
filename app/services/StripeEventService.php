<?php

/**
 * Authors:
 * - Ty Eggen
 */

namespace app\services;

use app\contracts\IStripeEventService1;
use app\domain\StripeEvent;
use vhs\services\Service;

class StripeEventService extends Service implements IStripeEventService1 {
    /**
     * @permission administrator
     *
     * @param $filters
     *
     * @return int
     */
    public function CountRecords($filters) {
        return StripeEvent::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param $ipnId
     *
     * @return mixed
     */
    public function Get($eventId) {
        return StripeEvent::find($eventId);
    }

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetAll() {
        return StripeEvent::findAll();
    }

    /**
     * @permission administrator
     *
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return mixed
     */
    public function ListRecords($page, $size, $columns, $order, $filters) {
        return StripeEvent::page($page, $size, $columns, $order, $filters);
    }
}
