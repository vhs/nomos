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
     * @permission administrator|user
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountGenuineCards($filters): int;

    /**
     * @permission administrator
     *
     * @param int                     $userid
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountGenuineUserCards($userid, $filters): int;

    /**
     * @permission administrator
     *
     * @param string $key
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
     * @return \app\domain\GenuineCard
     */
    public function IssueCard($email, $key): GenuineCard;

    /**
     * @permission administrator
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\GenuineCard[]
     */
    public function ListGenuineCards($page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
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
     * @return \app\domain\GenuineCard
     */
    public function RegisterGenuineCard($key, $notes): GenuineCard;

    /**
     * @permission administrator
     *
     * @param string $key
     * @param bool   $active
     *
     * @return bool
     */
    public function UpdateGenuineCardActive($key, $active): bool;

    /**
     * @permission authenticated
     *
     * @param string $key
     *
     * @return bool
     */
    public function ValidateGenuineCard($key): bool;
}
