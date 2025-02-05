<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/20/2015
 * Time: 12:14 PM.
 */

namespace app\contracts\v2;

use app\domain\GenuineCard;
use vhs\services\IContract;

/** @typescript */
interface IMemberCardService2 extends IContract {
    /**
     * @permission administrator
     *
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountGenuineCards($filters): int;

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $filters
     *
     * @throws \Exception
     * @throws string
     *
     * @return int
     */
    public function CountGenuineUserCards($userid, $filters): int;

    /**
     * @permission administrator
     *
     * @param string $key
     *
     * @throws string
     *
     * @return \app\domain\GenuineCard
     */
    public function GetGenuineCardDetails($key): GenuineCard;

    /**
     * @permission administrator
     *
     * @param string $email
     * @param string $key
     *
     * @throws \Exception
     * @throws string
     *
     * @return \app\domain\GenuineCard
     */
    public function IssueCard($email, $key): GenuineCard;

    /**
     * @permission administrator
     *
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @throws string
     *
     * @return \app\domain\GenuineCard[]
     */
    public function ListGenuineCards($page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @throws \Exception
     * @throws string
     *
     * @return \app\domain\GenuineCard[]
     */
    public function ListUserGenuineCards($userid, $page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator
     *
     * @param string $key
     * @param string $notes
     *
     * @throws \Exception
     * @throws string
     *
     * @return \app\domain\GenuineCard
     */
    public function RegisterGenuineCard($key, $notes): GenuineCard;

    /**
     * @permission administrator
     *
     * @param string $key
     * @param string $active
     *
     * @throws \Exception
     * @throws string
     *
     * @return bool
     */
    public function UpdateGenuineCardActive($key, $active): bool;

    /**
     * @permission authenticated
     *
     * @param string $key
     *
     * @throws string
     *
     * @return bool
     */
    public function ValidateGenuineCard($key): bool;
}
