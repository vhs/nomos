<?php

namespace app\services;

use app\contracts\IIpnService1;
use app\domain\Ipn;
use vhs\services\Service;

class IpnService extends Service implements IIpnService1 {
    public function GetAll() {
        return Ipn::findAll();
    }

    public function Get($ipnId) {
        return Ipn::find($ipnId);
    }

    public function ListRecords($page, $size, $columns, $order, $filters) {
        return Ipn::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     * @param $filters
     * @return int
     */
    public function CountRecords($filters) {
        return Ipn::count($filters);
    }
}
?>


