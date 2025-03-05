<?php

/**
 * User: James Sapara.
 */

namespace app\contracts\v2;

use app\dto\v2\MetricServiceGetCreatedDatesResult;
use app\dto\v2\MetricServiceGetMembersResult;
use app\dto\v2\MetricServiceGetRevenueResult;
use app\dto\v2\MetricServiceNewKeyholdersResult;
use app\dto\v2\MetricServiceNewMembersResult;
use app\dto\v2\MetricServiceTotalKeyHoldersResult;
use app\dto\v2\MetricServiceTotalMembersResult;
use app\enums\MetricServiceGroupType;
use vhs\services\IContract;

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
     * @return \app\dto\v2\MetricServiceGetCreatedDatesResult
     */
    public function GetCreatedDates($start_range, $end_range): MetricServiceGetCreatedDatesResult;

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\Payment[]
     */
    public function GetExceptionPayments(): array;

    /**
     * @permission user
     *
     * @param string                            $start_range
     * @param string                            $end_range
     * @param \app\enums\MetricServiceGroupType $group
     *
     * @throws string
     *
     * @return \app\dto\v2\MetricServiceGetMembersResult
     */
    public function GetMembers($start_range, $end_range, $group): MetricServiceGetMembersResult;

    /**
     * @permission user
     *
     * @param string $start_range string iso date in UTC, if empty is start of today
     * @param string $end_range   string iso date in UTC, if empty is end of today
     *
     * @throws string
     *
     * @return \app\dto\v2\MetricServiceNewKeyholdersResult
     */
    public function GetNewKeyHolders($start_range, $end_range): MetricServiceNewKeyholdersResult;

    /**
     * @permission user
     *
     * @param string $start_range string iso date in UTC, if empty is start of today
     * @param string $end_range   string iso date in UTC, if empty is end of today
     *
     * @throws string
     *
     * @return \app\dto\v2\MetricServiceNewMembersResult
     */
    public function GetNewMembers($start_range, $end_range): MetricServiceNewMembersResult;

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
     * @param string                            $start_range string iso date in UTC, if empty is end of today
     * @param string                            $end_range   string iso date in UTC, if empty is end of today
     * @param \app\enums\MetricServiceGroupType $group       group by month, day, year
     *
     * @throws string
     *
     * @return \app\dto\v2\MetricServiceGetRevenueResult
     */
    public function GetRevenue($start_range, $end_range, $group): MetricServiceGetRevenueResult;

    /**
     * @permission user
     *
     * @throws string
     *
     * @return \app\dto\v2\MetricServiceTotalKeyHoldersResult
     */
    public function GetTotalKeyHolders(): MetricServiceTotalKeyHoldersResult;

    /**
     * @permission user
     *
     * @throws string
     *
     * @return \app\dto\v2\MetricServiceTotalMembersResult
     */
    public function GetTotalMembers(): MetricServiceTotalMembersResult;
}
