<?php
/**
 * User: James
 */

namespace app\contracts;


use vhs\services\IContract;

interface IMembershipService1 extends IContract {

    /**
     * @permission administrator
     * @param $title
     * @param $description
     * @param $price
     * @param $days
     * @param $private
     * @param $active
     * @param $code
     * @return mixed
     */
    public function Create($title, $description, $price, $code, $days, $period);


    /**
     * @permission administrator
     * @return mixed
     */
    public function GetAll();

    /**
     * @permission administrator
     * @param $membershipId
     * @return mixed
     */
    public function Get($membershipId);

    /**
     * @permission administrator
     * @return mixed
     */
    public function Update($membershipId, $title, $description, $price, $code, $days, $period);

    /**
     * @permission administrator
     * @return mixed
     */
    public function UpdatePrivate($membershipId, $private);

    /**
     * @permission administrator
     * @return mixed
     */
    public function UpdateRecurring($membershipId, $recurring);

    /**
     * @permission administrator
     * @return mixed
     */
    public function UpdateTrial($membershipId, $trial);

    /**
     * @permission administrator
     * @return mixed
     */
    public function UpdateActive($membershipId, $active);

    /**
     * @permission administrator
     */
    public function PutPrivileges($membershipId, $privileges);
}