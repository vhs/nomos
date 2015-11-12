<?php

namespace app\services;


use app\contracts\IMetricService1;
use app\domain\Metric;
use app\domain\Membership;
use app\domain\Payment;
use app\domain\User;
use app\schema\SettingsSchema;
use vhs\database\Database;
use vhs\database\wheres\Where;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

class MetricService extends Service implements IMetricService1 {

    public function GetNewMembers($start_range, $end_range) {
        $start = strtotime($start_range);
        $end = strtotime($end_range);
        $count = Metric::NewMemberCount($start, $end);
        return array(
            "start_range" => $start_range,
            "start" => $start,
            "end_range" => $end_range,
            "end" => $end,
            "value" => $count
        );
    }

    public function GetNewKeyHolders($start_range, $end_range) {
        $start = strtotime($start_range);
        $end = strtotime($end_range);
        $membership = Membership::findByCode('key-holder');
        $count = Metric::NewMembershipByIdCount($membership[0]->id, $start, $end);
        return array(
            "start_range" => $start_range,
            "end_range" => $end_range,
            "value" => $count
        );
    }

    public function GetTotalMembers($start_range, $end_range) {
        $start = strtotime($start_range);
        $end = strtotime($end_range);
        $count = Metric::NewMemberCount($start, $end);
        return array(
            "start_range" => $start_range,
            "end_range" => $end_range,
            "value" => $count
        );
    }

    public function GetTotalKeyHolders($start_range, $end_range) {
        $start = strtotime($start_range);
        $end = strtotime($end_range);
        $membership = Membership::findByCode('key-holder');
        $count = Metric::MembershipByIdCount($membership[0]->id, $start, $end);
        return array(
            "start_range" => $start_range,
            "end_range" => $end_range,
            "value" => $count
        );
    }


    /**
     * @permission administrator
     * @return mixed
     */
    public function GetPendingAccounts() {
        return User::where(Where::Equal(User::Schema()->Columns()->active, 't'));
    }

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetExceptionPayments() {
        return Payment::where(Where::NotEqual(Payment::Schema()->Columns()->status, 1));
    }
}