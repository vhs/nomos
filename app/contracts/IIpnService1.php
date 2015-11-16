<?php
/**
 * User: Steven Smethurst
 */

namespace app\contracts;

use vhs\services\IContract;

interface IIpnService1 extends IContract {

    /**
    * @permission administrator
    * @return mixed
    */
    public function GetAll();

    /**
     * @permission administrator
     * @param $ipnId
     * @return mixed
     */
    public function Get($ipnId);

    /**
     * @permission administrator
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListRecords($page, $size, $columns, $order, $filters);
}