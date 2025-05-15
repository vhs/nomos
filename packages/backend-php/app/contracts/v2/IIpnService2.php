<?php

/**
 * User: Steven Smethurst.
 */

namespace app\contracts\v2;

use app\domain\Ipn;
use vhs\services\IContract;

/** @typescript */
interface IIpnService2 extends IContract {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountRecords($filters): int;

    /**
     * @permission administrator
     *
     * @param int $ipnId
     *
     * @return \app\domain\Ipn|null
     */
    public function Get($ipnId): Ipn|null;

    /**
     * @permission administrator
     *
     * @return \app\domain\Ipn[]
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
     * @return \app\domain\Ipn[]
     */
    public function ListRecords($page, $size, $columns, $order, $filters): array;
}
