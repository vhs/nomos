<?php

namespace app\handlers\v2;

use app\contracts\v2\IIpnService2;
use app\domain\Ipn;
use vhs\domain\exceptions\DomainException;
use vhs\services\Service;

/** @typescript */
class IpnServiceHandler2 extends Service implements IIpnService2 {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
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
     * @throws \vhs\domain\exceptions\DomainException
     *
     * @return \app\domain\Ipn|null
     */
    public function Get($ipnId): Ipn|null {
        /** @var \app\domain\Ipn|null */
        $result = Ipn::find($ipnId);

        if (is_null($result)) {
            throw new DomainException('Transaction not found!');
        }

        return $result;
    }

    /**
     * @permission administrator
     *
     * @return \app\domain\Ipn[]
     */
    public function GetAll(): array {
        return Ipn::findAll();
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
     * @return \app\domain\Ipn[]
     */
    public function ListRecords($page, $size, $columns, $order, $filters): array {
        /** @var \app\domain\Ipn[] */
        return Ipn::page($page, $size, $columns, $order, $filters);
    }
}
