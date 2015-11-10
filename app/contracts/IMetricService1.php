<?php
/**
 * User: James Sapara
 */

namespace app\contracts;


use vhs\services\IContract;

interface IMetricService1 extends IContract {

    /**
     * @permission user
     * @param start_range string iso date in UTC, if empty is start of today
     * @param end_range string iso date in UTC, if empty is end of today
     * @return mixed
     */
    public function GetNewMembers($start_range, $end_range);

    /**
     * @permission user
     * @param start_range string iso date in UTC, if empty is start of today
     * @param end_range string iso date in UTC, if empty is end of today
     * @return mixed
     */
    public function GetNewKeyHolders($start_range, $end_range);

    /**
     * @permission user
     * @param start_range string iso date in UTC, if empty is start of today
     * @param end_range string iso date in UTC, if empty is end of today
     * @return mixed
     */
    public function GetTotalMembers($start_range, $end_range);

    /**
     * @permission user
     * @param start_range string iso date in UTC, if empty is start of today
     * @param end_range string iso date in UTC, if empty is end of today
     * @return mixed
     */
    public function GetTotalKeyHolders($start_range, $end_range);

}