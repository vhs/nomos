<?php

/**
 * User: James.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IMembershipService1 extends IContract {
    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function CountMemberships($filters);

    /**
     * @permission administrator
     *
     * @param string $title
     * @param string $description
     * @param float  $price
     * @param string $code
     * @param int    $days
     * @param mixed  $period
     *
     * @return mixed
     */
    public function Create($title, $description, $price, $code, $days, $period);

    /**
     * @permission administrator
     *
     * @param int $membershipId
     *
     * @return mixed
     */
    public function Get($membershipId);

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
    public function ListMemberships($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param int             $membershipId
     * @param string|string[] $privileges
     *
     * @return void
     */
    public function PutPrivileges($membershipId, $privileges);

    /**
     * @permission administrator
     *
     * @param int    $membershipId
     * @param string $title
     * @param string $description
     * @param float  $price
     * @param string $code
     * @param int    $days
     * @param mixed  $period
     *
     * @return mixed
     */
    public function Update($membershipId, $title, $description, $price, $code, $days, $period);

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $active
     *
     * @return void
     */
    public function UpdateActive($membershipId, $active);

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $private
     *
     * @return void
     */
    public function UpdatePrivate($membershipId, $private);

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $recurring
     *
     * @return void
     */
    public function UpdateRecurring($membershipId, $recurring);

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $trial
     *
     * @return void
     */
    public function UpdateTrial($membershipId, $trial);
}
