<?php

/**
 * Authors:
 * - Ty Eggen
 */

namespace app\services;

use app\contracts\IStripeEventService1;
use app\domain\StripeEvent;
use vhs\services\Service;

/** @typescript */
class StripeEventService extends Service implements IStripeEventService1 {
    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountRecords($filters) {
        return StripeEvent::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param int $eventId
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
     * @param int                            $page
     * @param int                            $size
     * @param string                         $columns
     * @param string                         $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function ListRecords($page, $size, $columns, $order, $filters) {
        return StripeEvent::page($page, $size, $columns, $order, $filters);
    }
}
