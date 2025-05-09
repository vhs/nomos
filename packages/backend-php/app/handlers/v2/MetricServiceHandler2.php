<?php

namespace app\handlers\v2;

use app\constants\Formats;
use app\contracts\v2\IMetricService2;
use app\domain\Membership;
use app\domain\Payment;
use app\domain\User;
use app\dto\UserActiveEnum;
use app\dto\v2\MetricServiceGetCreatedDatesResult;
use app\dto\v2\MetricServiceGetMembersResult;
use app\dto\v2\MetricServiceGetRevenueResult;
use app\dto\v2\MetricServiceNewKeyholdersResult;
use app\dto\v2\MetricServiceNewMembersResult;
use app\dto\v2\MetricServiceTotalKeyHoldersResult;
use app\dto\v2\MetricServiceTotalMembersResult;
use app\schema\UserSchema;
use DateTime;
use vhs\database\Database;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\services\Service;

/** @typescript */
class MetricServiceHandler2 extends Service implements IMetricService2 {
    /**
     * @permission user
     *
     * @param string $start_range
     * @param string $end_range
     *
     * @return \app\dto\v2\MetricServiceGetCreatedDatesResult
     */
    public function GetCreatedDates($start_range, $end_range): MetricServiceGetCreatedDatesResult {
        $users = User::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::GreaterEqual(User::Schema()->Columns()->created, $start_range),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
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

        $result = new MetricServiceGetCreatedDatesResult([
            'start_range' => $start_range,
            'end_range' => $end_range,
            'byDowHour' => $byDowHour,
            'byMonthDow' => $byMonthDow
        ]);

        return $result;
    }

    /**
     * @permission administrator
     *
     * @return \app\domain\Payment[]
     */
    public function GetExceptionPayments(): array {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        return Payment::where(Where::NotEqual(Payment::Schema()->Columns()->status, 1));
    }

    /**
     * @permission user
     *
     * @param string                            $start_range
     * @param string                            $end_range
     * @param \app\enums\MetricServiceGroupType $group
     *
     * @return \app\dto\v2\MetricServiceGetMembersResult
     */
    public function GetMembers($start_range, $end_range, $group): MetricServiceGetMembersResult {
        $users = User::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::GreaterEqual(User::Schema()->Columns()->created, $start_range),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::LesserEqual(User::Schema()->Columns()->created, $end_range)
            )
        );

        $payments = Payment::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(Payment::Schema()->Columns()->status, 1),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::GreaterEqual(Payment::Schema()->Columns()->date, $start_range),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::LesserEqual(Payment::Schema()->Columns()->date, $end_range),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Like(Payment::Schema()->Columns()->item_number, 'vhs_membership_%')
            )
        );

        $created = [];
        $expired = [];

        foreach ($users as $user) {
            $created[] = $this->countByDate($created, $user->created, $group);
            $expired[] = $this->countByDate($expired, $user->mem_expire, $group);
        }

        $total = [];

        foreach ($payments as $payment) {
            $total = $this->countByDate($total, $payment->date, $group);
        }

        ksort($created);
        ksort($expired);
        ksort($total);

        $result = new MetricServiceGetMembersResult([
            'start_range' => $start_range,
            'end_range' => $end_range,
            'created' => $created,
            'expired' => $expired,
            'total' => $total
        ]);

        return $result;
    }

    /**
     * @permission user
     *
     * @param string $start_range string iso date in UTC, if empty is start of today
     * @param string $end_range   string iso date in UTC, if empty is end of today
     *
     * @return \app\dto\v2\MetricServiceNewKeyholdersResult
     */
    public function GetNewKeyHolders($start_range, $end_range): MetricServiceNewKeyholdersResult {
        $start = strtotime($start_range);
        $end = strtotime($end_range);
        $membership = Membership::findByCode(Membership::KEYHOLDER);
        $count = $this->NewMembershipByIdCount($membership[0]->id, $start, $end);

        return new MetricServiceNewKeyholdersResult([
            'value' => $count
        ]);
    }

    /**
     * @permission user
     *
     * @param string $start_range string iso date in UTC, if empty is start of today
     * @param string $end_range   string iso date in UTC, if empty is end of today
     *
     * @return \app\dto\v2\MetricServiceNewMembersResult
     */
    public function GetNewMembers($start_range, $end_range): MetricServiceNewMembersResult {
        $start = strtotime($start_range);
        $end = strtotime($end_range);
        $count = $this->NewMemberCount($start, $end);

        return new MetricServiceNewMembersResult([
            'start_range' => $start_range,
            'start' => $start,
            'end_range' => $end_range,
            'end' => $end,
            'value' => $count
        ]);
    }

    /**
     * @permission administrator
     *
     * @return \app\domain\User[]
     */
    public function GetPendingAccounts(): mixed {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        return User::where(Where::Equal(User::Schema()->Columns()->active, UserActiveEnum::PENDING->value));
    }

    /**
     * @permission user
     *
     * @param string                            $start_range string iso date in UTC, if empty is end of today
     * @param string                            $end_range   string iso date in UTC, if empty is end of today
     * @param \app\enums\MetricServiceGroupType $group       group by month, day, year
     *
     * @return \app\dto\v2\MetricServiceGetRevenueResult
     */
    public function GetRevenue($start_range, $end_range, $group): MetricServiceGetRevenueResult {
        $payments = Payment::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(Payment::Schema()->Columns()->status, 1),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::GreaterEqual(Payment::Schema()->Columns()->date, $start_range),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
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

        return new MetricServiceGetRevenueResult([
            'start_range' => $start_range,
            'end_range' => $end_range,
            'grouping' => $byDate,
            'by_membership' => $byMembership
        ]);
    }

    /**
     * @permission user
     *
     * @return \app\dto\v2\MetricServiceTotalKeyHoldersResult
     */
    public function GetTotalKeyHolders(): MetricServiceTotalKeyHoldersResult {
        $membership = Membership::findByCode(Membership::KEYHOLDER);
        $count = $this->TotalMembershipByIdCount($membership[0]->id);

        return new MetricServiceTotalKeyHoldersResult([
            'value' => $count
        ]);
    }

    /**
     * @permission user
     *
     * @return \app\dto\v2\MetricServiceTotalMembersResult
     */
    public function GetTotalMembers(): MetricServiceTotalMembersResult {
        $count = $this->TotalMemberCount();

        return new MetricServiceTotalMembersResult([
            'value' => $count
        ]);
    }

    /**
     * countByDate.
     *
     * @param mixed[] $arr
     * @param mixed   $date
     * @param mixed   $group
     *
     * @return mixed[]
     */
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

    /**
     * Get the total new members recorded in the date range.
     *
     * @param int $start int unixtime
     * @param int $end   int unixtime
     *
     * @return int
     */
    private function NewMemberCount($start, $end): int {
        $query = Query::count(
            UserSchema::Table(),
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(UserSchema::Columns()->active, UserActiveEnum::ACTIVE->value),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::GreaterEqual(UserSchema::Columns()->mem_expire, date(Formats::DATE_TIME_ISO_SHORT_FULL)),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::LesserEqual(UserSchema::Columns()->created, date(Formats::DATE_TIME_ISO_SHORT_MIDNIGHT, $end)),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::GreaterEqual(UserSchema::Columns()->created, date(Formats::DATE_TIME_ISO_SHORT_MIDNIGHT, $start))
            )
        );

        return Database::count($query);
    }

    /**
     * Get the total new memberships of a type recorded in the date range.
     *
     * @param int $membership_id int
     * @param int $start         int unixtime
     * @param int $end           int unixtime
     *
     * @return int
     */
    private function NewMembershipByIdCount($membership_id, $start, $end): int {
        $query = Query::count(
            UserSchema::Table(),
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(UserSchema::Columns()->active, UserActiveEnum::ACTIVE->value),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::GreaterEqual(UserSchema::Columns()->mem_expire, date(Formats::DATE_TIME_ISO_SHORT_FULL)),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(UserSchema::Columns()->membership_id, $membership_id),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::LesserEqual(UserSchema::Columns()->created, date(Formats::DATE_TIME_ISO_SHORT_MIDNIGHT, $end)),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::GreaterEqual(UserSchema::Columns()->created, date(Formats::DATE_TIME_ISO_SHORT_MIDNIGHT, $start))
            )
        );

        return Database::count($query);
    }

    /**
     * Get the total members.
     *
     * @return int
     */
    private function TotalMemberCount(): int {
        return Database::count(
            Query::count(
                UserSchema::Table(),
                Where::_And(
                    // TODO implement proper typing
                    // @phpstan-ignore property.notFound
                    Where::Equal(UserSchema::Columns()->active, UserActiveEnum::ACTIVE->value),
                    // TODO implement proper typing
                    // @phpstan-ignore property.notFound
                    Where::GreaterEqual(UserSchema::Columns()->mem_expire, date(Formats::DATE_TIME_ISO_SHORT_FULL))
                )
            )
        );
    }

    /**
     * TotalMembershipByIdCount.
     *
     * @param int $membership_id
     *
     * @return int
     */
    private function TotalMembershipByIdCount($membership_id): int {
        return Database::count(
            Query::count(
                UserSchema::Table(),
                Where::_And(
                    // TODO implement proper typing
                    // @phpstan-ignore property.notFound
                    Where::Equal(UserSchema::Columns()->active, UserActiveEnum::ACTIVE->value),
                    // TODO implement proper typing
                    // @phpstan-ignore property.notFound
                    Where::GreaterEqual(UserSchema::Columns()->mem_expire, date(Formats::DATE_TIME_ISO_SHORT_FULL)),
                    // TODO implement proper typing
                    // @phpstan-ignore property.notFound
                    Where::Equal(UserSchema::Columns()->membership_id, $membership_id)
                )
            )
        );
    }
}
