<?php

/**
 * Authors:
 * - Ty Eggen
 */

namespace app\handlers\v2;

use app\contracts\v2\IStripeEventService2;
use app\domain\StripeEvent;
use vhs\domain\exceptions\DomainException;
use vhs\services\Service;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class StripeEventServiceHandler2 extends Service implements IStripeEventService2 {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
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
     * @throws \vhs\domain\exceptions\DomainException
     *
     * @return \app\domain\StripeEvent
     */
    public function Get($eventId): StripeEvent {
        /** @var StripeEvent|null */
        $stripeEvent = StripeEvent::find($eventId);

        if (is_null($stripeEvent)) {
            throw new DomainException(sprintf('StripeEvent with id [%s] not found!', $eventId), HttpStatusCodes::Client_Error_Not_Found->value);
        }

        return $stripeEvent;
    }

    /**
     * @permission administrator
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
     * @return \app\domain\StripeEvent[]
     */
    public function ListRecords($page, $size, $columns, $order, $filters): array {
        return StripeEvent::page($page, $size, $columns, $order, $filters);
    }
}
