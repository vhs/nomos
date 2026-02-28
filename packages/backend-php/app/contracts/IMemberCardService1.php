<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/20/2015
 * Time: 12:14 PM.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IMemberCardService1 extends IContract {
    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function CountGenuineCards($filters);

    /**
     * @permission administrator|user
     *
     * @param int                            $userid
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     * @return mixed
     */
    public function CountGenuineUserCards($userid, $filters);

    /**
     * @permission administrator
     *
     * @param mixed $key
     *
     * @return mixed
     */
    public function GetGenuineCardDetails($key);

    /**
     * @permission administrator
     *
     * @param string $email
     * @param string $key
     *
     * @return mixed
     */
    public function IssueCard($email, $key);

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
    public function ListGenuineCards($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator|user
     *
     * @param int                            $userid
     * @param int                            $page
     * @param int                            $size
     * @param mixed                          $columns
     * @param mixed                          $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function ListUserGenuineCards($userid, $page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param string $key
     * @param string $notes
     *
     * @return \app\domain\GenuineCard
     */
    public function RegisterGenuineCard($key, $notes);

    /**
     * @permission administrator
     *
     * @param string $key
     * @param bool   $active
     *
     * @return mixed
     */
    public function UpdateGenuineCardActive($key, $active);

    /**
     * @permission authenticated
     *
     * @param string $key
     *
     * @return bool
     */
    public function ValidateGenuineCard($key);
}
