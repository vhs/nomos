<?php

/**
 * User: James Sapara.
 */

namespace app\contracts\v2;

use vhs\services\IContract;

enum MetricServiceGroupType: string {
    case ALL = 'all';
    case DAY = 'day';
    case MONTH = 'month';
    case YEAR = 'year';
}

/** @typescript */
interface IMetricService2 extends IContract {
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
    public function GetCreatedDates($start_range, $end_range): mixed;

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return mixed
     */
    public function GetExceptionPayments(): array;

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
    public function GetMembers($start_range, $end_range, $group): mixed;

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
    public function GetNewKeyHolders($start_range, $end_range): mixed;

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
    public function GetNewMembers($start_range, $end_range): mixed;

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\User[]
     */
    public function GetPendingAccounts(): mixed;

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
    public function GetRevenue($start_range, $end_range, $group): mixed;

    /**
     * @permission user
     *
     * @throws string
     *
     * @return mixed
     */
    public function GetTotalKeyHolders(): mixed;

    /**
     * @permission user
     *
     * @throws string
     *
     * @return mixed
     */
    public function GetTotalMembers(): mixed;
}
