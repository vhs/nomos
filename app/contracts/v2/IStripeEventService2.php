<?php

/**
 * Authors:
 * - Ty Eggen
 */

namespace app\contracts\v2;

use app\domain\StripeEvent;
use vhs\services\IContract;

/** @typescript */
interface IStripeEventService2 extends IContract {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountRecords($filters): int;

    /**
     * @permission administrator
     *
     * @param int $eventId
     *
     * @throws string
     *
     * @return \app\domain\StripeEvent
     */
    public function Get($eventId): StripeEvent;

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\StripeEvent[]
     */
    public function GetAll(): array;

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
    public function ListRecords($page, $size, $columns, $order, $filters): array;
}
