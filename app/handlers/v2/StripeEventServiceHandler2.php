<?php

/**
 * Authors:
 * - Ty Eggen
 */

namespace app\handlers\v2;

use app\contracts\v2\IStripeEventService2;
use app\domain\StripeEvent;
use vhs\services\Service;

/** @typescript */
class StripeEventServiceHandler2 extends Service implements IStripeEventService2 {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountRecords($filters): int {
        return StripeEvent::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param int $eventId
     *
     * @throws string
     *
     * @return \app\domain\StripeEvent
     */
    public function Get($eventId): StripeEvent {
        return StripeEvent::find($eventId);
    }

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\StripeEvent[]
     */
    public function GetAll(): array {
        return StripeEvent::findAll();
    }

    /**
     * @permission administrator
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @throws string
     *
     * @return \app\domain\StripeEvent[]
     */
    public function ListRecords($page, $size, $columns, $order, $filters): array {
        return StripeEvent::page($page, $size, $columns, $order, $filters);
    }
}
