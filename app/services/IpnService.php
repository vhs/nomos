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
}
?>


