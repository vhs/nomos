<?php

namespace app\services;

use app\contracts\IMetricService1;
use app\domain\Membership;
use app\domain\Payment;
use app\domain\User;
use app\schema\PaymentSchema;
use app\schema\UserSchema;
use DateTime;
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
        return [
            'start_range' => $start_range,
            'start' => $start,
            'end_range' => $end_range,
            'end' => $end,
            'value' => $count
        ];
    }

    public function GetNewKeyHolders($start_range, $end_range) {
        $start = strtotime($start_range);
        $end = strtotime($end_range);
        $membership = Membership::findByCode(Membership::KEYHOLDER);
        $count = self::NewMembershipByIdCount($membership[0]->id, $start, $end);
        return [
            'start_range' => $start_range,
            'end_range' => $end_range,
            'value' => $count
        ];
    }

    public function GetTotalMembers() {
        $count = self::TotalMemberCount();
        return [
            'value' => $count
        ];
    }

    public function GetTotalKeyHolders() {
        $membership = Membership::findByCode(Membership::KEYHOLDER);
        $count = self::TotalMembershipByIdCount($membership[0]->id);
        return [
            'value' => $count
        ];
    }

    public function GetRevenue($start_range, $end_range, $group) {
        $payments = Payment::where(
            Where::_And(
                Where::Equal(Payment::Schema()->Columns()->status, 1),
                Where::GreaterEqual(Payment::Schema()->Columns()->date, $start_range),
                Where::LesserEqual(Payment::Schema()->Columns()->date, $end_range)
            )
        );

        $byMembership = [];
        $byDate = [];

        foreach ($payments as $payment) {
            $membershipKey = $payment->item_number == '' || is_null($payment->item_number) ? 'Donation' : $payment->item_number;
            if (!array_key_exists($membershipKey, $byMembership)) {
                $byMembership[$membershipKey] = [];
            }

            $grouping = new DateTime($payment->date);

            switch ($group) {
                case 'day':
                    $grouping = $grouping->format('Y-m-d');
                    break;
                case 'month':
                    $grouping = $grouping->format('Y-m');
                    break;
                case 'year':
                    $grouping = $grouping->format('Y');
                    break;
                default:
                    $grouping = 'all';
                    break;
            }

            if (!array_key_exists($grouping, $byMembership[$membershipKey])) {
                $byMembership[$membershipKey][$grouping] = 0;
            }

            $byMembership[$membershipKey][$grouping] += $payment->rate_amount;

            if (!array_key_exists($grouping, $byDate)) {
                $byDate[$grouping] = 0;
            }

            $byDate[$grouping] += $payment->rate_amount;
        }

        return [
            'start_range' => $start_range,
            'end_range' => $end_range,
            'grouping' => $byDate,
            'by_membership' => $byMembership
        ];
    }

    public function GetMembers($start_range, $end_range, $group) {
        $users = User::where(
            Where::_And(
                Where::GreaterEqual(User::Schema()->Columns()->created, $start_range),
                Where::LesserEqual(User::Schema()->Columns()->created, $end_range)
            )
        );

        $payments = Payment::where(
            Where::_And(
                Where::Equal(Payment::Schema()->Columns()->status, 1),
                Where::GreaterEqual(Payment::Schema()->Columns()->date, $start_range),
                Where::LesserEqual(Payment::Schema()->Columns()->date, $end_range),
                Where::Like(Payment::Schema()->Columns()->item_number, 'vhs_membership_%')
            )
        );

        $created = [];
        $expired = [];

        foreach ($users as $user) {
            $created = $this->countByDate($created, $user->created, $group);
            $expired = $this->countByDate($expired, $user->mem_expire, $group);
        }

        $total = [];

        foreach ($payments as $payment) {
            $total = $this->countByDate($total, $payment->date, $group);
        }

        ksort($created);
        ksort($expired);
        ksort($total);

        return [
            'start_range' => $start_range,
            'end_range' => $end_range,
            'created' => $created,
            'expired' => $expired,
            'total' => $total
        ];
    }

    private function countByDate($arr, $date, $group) {
        if (is_null($date)) {
            return $arr;
        }

        $grouping = new DateTime($date);

        if ($grouping > new DateTime()) {
            return $arr;
        }

        switch ($group) {
            case 'day':
                $grouping = $grouping->format('Y-m-d');
                break;
            case 'month':
                $grouping = $grouping->format('Y-m');
                break;
            case 'year':
                $grouping = $grouping->format('Y');
                break;
            default:
                $grouping = 'all';
                break;
        }

        if (!array_key_exists($grouping, $arr)) {
            $arr[$grouping] = 0;
        }

        $arr[$grouping] += 1;

        return $arr;
    }

    public function GetCreatedDates($start_range, $end_range) {
        $users = User::where(
            Where::_And(
                Where::GreaterEqual(User::Schema()->Columns()->created, $start_range),
                Where::LesserEqual(User::Schema()->Columns()->created, $end_range)
            )
        );

        $byDowHour = [];

        $byMonthDow = [];

        foreach ($users as $user) {
            $date = new DateTime($user->created);

            $dow = $date->format('w');
            $hour = $date->format('G');
            $month = $date->format('n');

            if (!array_key_exists($dow, $byDowHour)) {
                $byDowHour[$dow] = [];
                $byDowHour[$dow]['total'] = 0;
            }

            $byDowHour[$dow]['total'] += 1;

            if (!array_key_exists($hour, $byDowHour[$dow])) {
                $byDowHour[$dow][$hour] = 0;
            }

            $byDowHour[$dow][$hour] += 1;

            if (!array_key_exists($month, $byMonthDow)) {
                $byMonthDow[$month] = [];
                $byMonthDow[$month]['total'] = 0;
            }

            $byMonthDow[$month]['total'] += 1;

            if (!array_key_exists($dow, $byMonthDow[$month])) {
                $byMonthDow[$month][$dow] = 0;
            }

            $byMonthDow[$month][$dow] += 1;
        }

        return [
            'start_range' => $start_range,
            'end_range' => $end_range,
            'byDowHour' => $byDowHour,
            'byMonthDow' => $byMonthDow
        ];
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
        $query = Query::count(
            UserSchema::Table(),
            Where::_And(
                Where::Equal(UserSchema::Columns()->active, 'y'),
                Where::GreaterEqual(UserSchema::Columns()->mem_expire, date('Y-m-d H:i:s')),
                Where::LesserEqual(UserSchema::Columns()->created, date('Y-m-d 00:00:00', $end)),
                Where::GreaterEqual(UserSchema::Columns()->created, date('Y-m-d 00:00:00', $start))
            )
        );

        return Database::count($query);
    }

    /**
     * Get the total members
     * @param $start int unixtime
     * @param $end int unixtime
     * @return int
     */
    public static function TotalMemberCount() {
        return Database::count(
            Query::count(
                UserSchema::Table(),
                Where::_And(
                    Where::Equal(UserSchema::Columns()->active, 'y'),
                    Where::GreaterEqual(UserSchema::Columns()->mem_expire, date('Y-m-d H:i:s'))
                )
            )
        );
    }

    /**
     * Get the total new memberships of a type recorded in the date range.
     * @param $membership_id int
     * @param $start int unixtime
     * @param $end int unixtime
     * @return int
     */
    public static function NewMembershipByIdCount($membership_id, $start, $end) {
        $query = Query::count(
            UserSchema::Table(),
            Where::_And(
                Where::Equal(UserSchema::Columns()->active, 'y'),
                Where::GreaterEqual(UserSchema::Columns()->mem_expire, date('Y-m-d H:i:s')),
                Where::Equal(UserSchema::Columns()->membership_id, $membership_id),
                Where::LesserEqual(UserSchema::Columns()->created, date('Y-m-d 00:00:00', $end)),
                Where::GreaterEqual(UserSchema::Columns()->created, date('Y-m-d 00:00:00', $start))
            )
        );

        return Database::count($query);
    }

    public static function TotalMembershipByIdCount($membership_id) {
        return Database::count(
            Query::count(
                UserSchema::Table(),
                Where::_And(
                    Where::Equal(UserSchema::Columns()->active, 'y'),
                    Where::GreaterEqual(UserSchema::Columns()->mem_expire, date('Y-m-d H:i:s')),
                    Where::Equal(UserSchema::Columns()->membership_id, $membership_id)
                )
            )
        );
    }
}
