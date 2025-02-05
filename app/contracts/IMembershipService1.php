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
     * @param $filters
     *
     * @return mixed
     */
    public function CountMemberships($filters);

    /**
     * @permission administrator
     *
     * @param $title
     * @param $description
     * @param $price
     * @param $code
     * @param $days
     * @param $period
     *
     * @return mixed
     */
    public function Create($title, $description, $price, $code, $days, $period);

    /**
     * @permission administrator
     *
     * @param $membershipId
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
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return mixed
     */
    public function ListMemberships($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param $membershipId
     * @param $privileges
     */
    public function PutPrivileges($membershipId, $privileges);

    /**
     * @permission administrator
     *
     * @param $membershipId
     * @param $title
     * @param $description
     * @param $price
     * @param $code
     * @param $days
     * @param $period
     *
     * @return mixed
     */
    public function Update($membershipId, $title, $description, $price, $code, $days, $period);

    /**
     * @permission administrator
     *
     * @param $membershipId
     * @param $active
     *
     * @return mixed
     */
    public function UpdateActive($membershipId, $active);

    /**
     * @permission administrator
     *
     * @param $membershipId
     * @param $private
     *
     * @return mixed
     */
    public function UpdatePrivate($membershipId, $private);

    /**
     * @permission administrator
     *
     * @param $membershipId
     * @param $recurring
     *
     * @return mixed
     */
    public function UpdateRecurring($membershipId, $recurring);

    /**
     * @permission administrator
     *
     * @param $membershipId
     * @param $trial
     *
     * @return mixed
     */
    public function UpdateTrial($membershipId, $trial);
}
