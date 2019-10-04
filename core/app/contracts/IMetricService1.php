<?php
/**
 * User: James Sapara
 */

namespace app\contracts;


use vhs\services\IContract;

interface IMetricService1 extends IContract {

    /**
     * @permission user
     * @param string $start_range string iso date in UTC, if empty is start of today
     * @param string $end_range string iso date in UTC, if empty is end of today
     * @return mixed
     */
    public function GetNewMembers($start_range, $end_range);

    /**
     * @permission user
     * @param string $start_range string iso date in UTC, if empty is start of today
     * @param string $end_range string iso date in UTC, if empty is end of today
     * @return mixed
     */
    public function GetNewKeyHolders($start_range, $end_range);

    /**
     * @permission user
     * @return mixed
     */
    public function GetTotalMembers();

    /**
     * @permission user
     * @return mixed
     */
    public function GetTotalKeyHolders();

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetPendingAccounts();

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetExceptionPayments();

    /**
     * @permission user
     * @param string $start_range string iso date in UTC, if empty is end of today
     * @param string $end_range string iso date in UTC, if empty is end of today
     * @param string $group group by month, day, year
     * @return mixed
     */
    public function GetRevenue($start_range, $end_range, $group);

    /**
     * @permission user
     * @param $start_range
     * @param $end_range
     * @param $group
     * @return mixed
     */
    public function GetMembers($start_range, $end_range, $group);

    /**
     * @permission user
     * @param $start_range
     * @param $end_range
     * @return mixed
     */
    public function GetCreatedDates($start_range, $end_range);
}
