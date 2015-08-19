<?php

namespace app\services;


use app\contracts\IMetricService1;
use app\domain\Membership;
use app\domain\Privilege;
use app\domain\User;
use app\schema\SettingsSchema;
use vhs\database\Database;
use vhs\database\wheres\Where;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

class MetricService extends Service implements IMetricService1 {

    public function GetNewMembers($start_range, $end_range) {
        return array(
            "start_range" => $start_range,
            "end_range" => $end_range,
            "value" => 0
        );
    }

    public function GetNewKeyHolders($start_range, $end_range) {
        return array(
            "start_range" => $start_range,
            "end_range" => $end_range,
            "value" => 0
        );
    }


    public function GetTotalMembers($start_range, $end_range) {
        return array(
            "start_range" => $start_range,
            "end_range" => $end_range,
            "value" => 0
        );
    }


    public function GetTotalKeyHolders($start_range, $end_range) {
        return array(
            "start_range" => $start_range,
            "end_range" => $end_range,
            "value" => 0
        );
    }
}