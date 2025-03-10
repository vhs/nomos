<?php

/**
 * User: James.
 */

namespace app\contracts;

use vhs\services\IContract;

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
     * @param $days
     * @param $private
     * @param $active
     * @param $code
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
     */
    public function PutPrivileges($membershipId, $privileges);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function Update($membershipId, $title, $description, $price, $code, $days, $period);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function UpdateActive($membershipId, $active);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function UpdatePrivate($membershipId, $private);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function UpdateRecurring($membershipId, $recurring);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function UpdateTrial($membershipId, $trial);
}
