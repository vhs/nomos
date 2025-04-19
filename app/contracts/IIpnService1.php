<?php

/**
 * User: Steven Smethurst.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IIpnService1 extends IContract {
    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountRecords($filters);

    /**
     * @permission administrator
     *
     * @param mixed $ipnId
     *
     * @return mixed
     */
    public function Get($ipnId);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetAll();

    /**
     * @permission administrator
     *
     * @param int                            $page
     * @param int                            $size
     * @param mixed                          $columns
     * @param mixed                          $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function ListRecords($page, $size, $columns, $order, $filters);
}
