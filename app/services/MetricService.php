<?php

namespace app\services;


use app\contracts\IMetricService1;
use app\domain\Membership;
use app\domain\Payment;
use app\domain\User;
use app\schema\PaymentSchema;
use app\schema\UserSchema;
use vhs\database\Database;
use vhs\database\joins\Join;
use vhs\database\On;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\services\Service;

class MetricService extends Service implements IMetricService1 {

    public function GetNewMembers($start_range, $end_range) {
        $start = strtotime($start_range);
        $end = strtotime($end_range);
        $count = self::NewMemberCount($start, $end);
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
        $count = self::NewMembershipByIdCount($membership[0]->id, $start, $end);
        return array(
            "start_range" => $start_range,
            "end_range" => $end_range,
            "value" => $count
        );
    }

    public function GetTotalMembers() {
        $count = self::TotalMemberCount();
        return array(
            "value" => $count
        );
    }

    public function GetTotalKeyHolders() {
        $membership = Membership::findByCode('key-holder');
        $count = self::TotalMembershipByIdCount($membership[0]->id);
        return array(
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

    /**
     * Get the total new members recorded in the date range
     * @param $start int unixtime
     * @param $end int unixtime
     * @return int
     */
    public static function NewMemberCount($start, $end) {
        $join = Join::Left(
            PaymentSchema::Table(),
            On::Where(
                Where::Equal(PaymentSchema::Columns()->payer_email,
                    UserSchema::Columns()->email)
            )
        );

        $query = Query::count(
            UserSchema::Table(),
            Where::_And(
                Where::Equal(UserSchema::Columns()->active,"y"),
                Where::GreaterEqual(UserSchema::Columns()->mem_expire, date('Y-m-d H:i:s')),
                Where::LesserEqual(UserSchema::Columns()->created, date('Y-m-d 00:00:00', $end)),
                Where::GreaterEqual(UserSchema::Columns()->created, date('Y-m-d 00:00:00', $start)),
                Where::LesserEqual($join->table->columns->date, date('Y-m-d 00:00:00', $end)),
                Where::GreaterEqual($join->table->columns->date, date('Y-m-d 00:00:00', $start)),
                Where::Equal($join->table->columns->status, 1)
            ))->Join($join);

        return Database::count($query);
    }

    /**
     * Get the total members
     * @param $start int unixtime
     * @param $end int unixtime
     * @return int
     */
    public static function TotalMemberCount() {
        return Database::count(Query::count(
            UserSchema::Table(),
            Where::_And(
                Where::Equal(UserSchema::Columns()->active,"y"),
                Where::GreaterEqual(UserSchema::Columns()->mem_expire, date('Y-m-d H:i:s'))
            )));
    }

    /**
     * Get the total new memberships of a type recorded in the date range.
     * @param $membership_id int
     * @param $start int unixtime
     * @param $end int unixtime
     * @return int
     */
    public static function NewMembershipByIdCount($membership_id, $start, $end) {
        $join = Join::Left(
            PaymentSchema::Table(),
            On::Where(
                Where::Equal(PaymentSchema::Columns()->payer_email,
                    UserSchema::Columns()->email)
            )
        );

        $query = Query::count(
            UserSchema::Table(),
            Where::_And(
                Where::Equal(UserSchema::Columns()->active,"y"),
                Where::GreaterEqual(UserSchema::Columns()->mem_expire, date('Y-m-d H:i:s')),
                Where::Equal(UserSchema::Columns()->membership_id, $membership_id),
                Where::LesserEqual(UserSchema::Columns()->created, date('Y-m-d 00:00:00', $end)),
                Where::GreaterEqual(UserSchema::Columns()->created, date('Y-m-d 00:00:00', $start)),
                Where::LesserEqual($join->table->columns->date, date('Y-m-d 00:00:00', $end)),
                Where::GreaterEqual($join->table->columns->date, date('Y-m-d 00:00:00', $start)),
                Where::Equal($join->table->columns->status, 1)
            ))->Join($join);

        return Database::count($query);
    }

    public static function TotalMembershipByIdCount($membership_id) {
        return Database::count(Query::count(
            UserSchema::Table(),
            Where::_And(
                Where::Equal(UserSchema::Columns()->active,"y"),
                Where::GreaterEqual(UserSchema::Columns()->mem_expire, date('Y-m-d H:i:s')),
                Where::Equal(UserSchema::Columns()->membership_id, $membership_id)
            )));
    }
}