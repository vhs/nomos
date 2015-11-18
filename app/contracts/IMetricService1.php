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
}