<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/20/2015
 * Time: 12:14 PM.
 */

namespace app\contracts;

use vhs\services\IContract;

interface IMemberCardService1 extends IContract {
    /**
     * @permission administrator
     *
     * @param $filters
     *
     * @return mixed
     */
    public function CountGenuineCards($filters);

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $filters
     *
     * @return mixed
     *
     * @throws \Exception
     */
    public function CountGenuineUserCards($userid, $filters);

    /**
     * @permission administrator
     *
     * @param $key
     *
     * @return mixed
     */
    public function GetGenuineCardDetails($key);

    /**
     * @permission administrator
     *
     * @param $email
     * @param $key
     *
     * @return mixed
     *
     * @throws \Exception
     */
    public function IssueCard($email, $key);

    /**
     * @permission administrator
     *
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return mixed
     */
    public function ListGenuineCards($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return mixed
     *
     * @throws \Exception
     */
    public function ListUserGenuineCards($userid, $page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param $key
     * @param $notes
     *
     * @return GenuineCard
     *
     * @throws \Exception
     */
    public function RegisterGenuineCard($key, $notes);

    /**
     * @permission administrator
     *
     * @param $key
     * @param $active
     *
     * @return mixed
     */
    public function UpdateGenuineCardActive($key, $active);

    /**
     * @permission authenticated
     *
     * @param $key
     *
     * @return bool
     */
    public function ValidateGenuineCard($key);
}
