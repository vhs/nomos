<?php

namespace app\handlers\v2;

use app\contracts\v2\IMetricService2;
use app\domain\Membership;
use app\domain\Payment;
use app\domain\User;
use app\schema\UserSchema;
use DateTime;
use vhs\database\Database;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\services\Service;

/** @typescript */
class MetricServiceHandler2 extends Service implements IMetricService2 {
    /**
     * Get the total new members recorded in the date range.
     *
     * @param string $start int unixtime
     * @param string $end   int unixtime
     *
     * @throws string
     *
     * @return int
     */
    protected static function NewMemberCount($start, $end): int {
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
     * Get the total new memberships of a type recorded in the date range.
     *
     * @param int    $membership_id int
     * @param string $start         int unixtime
     * @param string $end           int unixtime
     *
     * @throws string
     *
     * @return int
     */
    protected static function NewMembershipByIdCount($membership_id, $start, $end): int {
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

    /**
     * Get the total members.
     *
     * @param string $start int unixtime
     * @param string $end   int unixtime
     *
     * @throws string
     *
     * @return int
     */
    protected static function TotalMemberCount(): int {
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

    protected static function TotalMembershipByIdCount($membership_id): int {
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

    /**
     * @permission user
     *
     * @param string $start_range
     * @param string $end_range
     *
     * @throws string
     *
     * @return mixed
     */
    public function GetCreatedDates($start_range, $end_range): array {
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
     *
     * @throws string
     *
     * @return mixed
     */
    public function GetExceptionPayments(): array {
        return Payment::where(Where::NotEqual(Payment::Schema()->Columns()->status, 1));
    }

    /**
     * @permission user
     *
     * @param string                     $start_range
     * @param string                     $end_range
     * @param "all"|"day"|"month"|"year" $group
     *
     * @throws string
     *
     * @return mixed
     */
    public function GetMembers($start_range, $end_range, $group): mixed {
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

    /**
     * @permission user
     *
     * @param string $start_range string iso date in UTC, if empty is start of today
     * @param string $end_range   string iso date in UTC, if empty is end of today
     *
     * @throws string
     *
     * @return mixed
     */
    public function GetNewKeyHolders($start_range, $end_range): mixed {
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

    /**
     * @permission user
     *
     * @param string $start_range string iso date in UTC, if empty is start of today
     * @param string $end_range   string iso date in UTC, if empty is end of today
     *
     * @throws string
     *
     * @return mixed
     */
    public function GetNewMembers($start_range, $end_range): mixed {
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

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\User[]
     */
    public function GetPendingAccounts(): mixed {
        return User::where(Where::Equal(User::Schema()->Columns()->active, 't'));
    }

    /**
     * @permission user
     *
     * @param string                     $start_range string iso date in UTC, if empty is end of today
     * @param string                     $end_range   string iso date in UTC, if empty is end of today
     * @param "all"|"day"|"month"|"year" $group       group by month, day, year
     *
     * @throws string
     *
     * @return mixed
     */
    public function GetRevenue($start_range, $end_range, $group): mixed {
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

    /**
     * @permission user
     *
     * @throws string
     *
     * @return mixed
     */
    public function GetTotalKeyHolders(): mixed {
        $membership = Membership::findByCode(Membership::KEYHOLDER);
        $count = self::TotalMembershipByIdCount($membership[0]->id);

        return [
            'value' => $count
        ];
    }

    /**
     * @permission user
     *
     * @throws string
     *
     * @return mixed
     */
    public function GetTotalMembers(): mixed {
        $count = self::TotalMemberCount();

        return [
            'value' => $count
        ];
    }

    private function countByDate($arr, $date, $group): mixed {
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
}
