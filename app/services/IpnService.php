<?php

namespace app\services;

use app\contracts\IIpnService1;
use app\domain\Ipn;
use vhs\services\Service;

class IpnService extends Service implements IIpnService1 {
    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountRecords($filters) {
        return Ipn::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param int $ipnId
     *
     * @return mixed
     */
    public function Get($ipnId) {
        return Ipn::find($ipnId);
    }

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetAll() {
        return Ipn::findAll();
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
        return Ipn::page($page, $size, $columns, $order, $filters);
    }
}
