<?php
/**
 * User: James Sapara
 */

namespace app\contracts;


use vhs\services\IContract;

interface IMetricService1 extends IContract {

    /**
     * @permission user
     * @return mixed
     */
    public function GetNewMembers($start_range, $end_range);

    /**
     * @permission user
     * @return mixed
     */
    public function GetNewKeyHolders($start_range, $end_range);

    /**
     * @permission user
     * @return mixed
     */
    public function GetTotalMembers($start_range, $end_range);

    /**
     * @permission user
     * @return mixed
     */
    public function GetTotalKeyHolders($start_range, $end_range);

}