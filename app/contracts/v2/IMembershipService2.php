<?php

/**
 * User: James.
 */

namespace app\contracts\v2;

use app\domain\Membership;
use vhs\services\IContract;

/** @typescript */
interface IMembershipService2 extends IContract {
    /**
     * @permission administrator
     *
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountMemberships($filters): int;

    /**
     * @permission administrator
     *
     * @param string $title
     * @param string $description
     * @param int    $price
     * @param string $code
     * @param string $days
     * @param string $period
     *
     * @throws string
     *
     * @return void
     */
    public function Create($title, $description, $price, $code, $days, $period): void;

    /**
     * @permission administrator
     *
     * @param int|int[] $membershipId
     *
     * @throws string
     *
     * @return \app\domain\Membership
     */
    public function Get($membershipId): Membership;

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\Membership[]
     */
    public function GetAll(): array;

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
     * @return \app\domain\Membership[]
     */
    public function ListMemberships($page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator
     *
     * @param int             $membershipId
     * @param string|string[] $privileges
     *
     * @throws string
     *
     * @return bool
     */
    public function PutPrivileges($membershipId, $privileges): bool;

    /**
     * @permission administrator
     *
     * @param int    $membershipId
     * @param string $title
     * @param string $description
     * @param int    $price
     * @param string $code
     * @param int    $days
     * @param string $period
     *
     * @throws string
     *
     * @return bool
     */
    public function Update($membershipId, $title, $description, $price, $code, $days, $period): bool;

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $active
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateActive($membershipId, $active): bool;

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $private
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdatePrivate($membershipId, $private): bool;

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $recurring
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateRecurring($membershipId, $recurring): bool;

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $trial
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateTrial($membershipId, $trial): bool;
}
