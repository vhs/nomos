<?php

namespace app\handlers\v2;

use app\contracts\v2\IIpnService2;
use app\domain\Ipn;
use vhs\services\Service;

/** @typescript */
class IpnServiceHandler2 extends Service implements IIpnService2 {
    /**
     * @permission administrator
     *
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountRecords($filters): int {
        return Ipn::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param int $ipnId
     *
     * @throws string
     *
     * @return \app\domain\Ipn
     */
    public function Get($ipnId): Ipn {
        return Ipn::find($ipnId);
    }

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\Ipn[]
     */
    public function GetAll(): array {
        return Ipn::findAll();
    }

    /**
     * @permission administrator
     *
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @throws string
     *
     * @return \app\domain\Ipn[]
     */
    public function ListRecords($page, $size, $columns, $order, $filters): array {
        return Ipn::page($page, $size, $columns, $order, $filters);
    }
}
