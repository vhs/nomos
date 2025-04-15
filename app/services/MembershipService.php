<?php

namespace app\services;

use app\contracts\IMembershipService1;
use app\domain\Membership;
use app\domain\Privilege;
use vhs\exceptions\HttpException;
use vhs\services\Service;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class MembershipService extends Service implements IMembershipService1 {
    /**
     * @permission administrator
     *
     * @param $filters
     *
     * @return mixed
     */
    public function CountMemberships($filters) {
        return Membership::count($filters);
    }

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
     * @throws \vhs\exceptions\HttpException
     *
     * @return mixed
     */
    public function Create($title, $description, $price, $code, $days, $period) {
        throw new HttpException('Sorry, no dice!', HttpStatusCodes::Server_Error_Not_Implemented);
    }

    /**
     * @permission administrator
     *
     * @param $membershipId
     *
     * @return mixed
     */
    public function Get($membershipId) {
        return Membership::find($membershipId);
    }

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetAll() {
        return Membership::findAll();
    }

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
    public function ListMemberships($page, $size, $columns, $order, $filters) {
        return Membership::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param $membershipId
     * @param $privileges
     */
    public function PutPrivileges($membershipId, $privileges) {
        $membership = $this->Get($membershipId);

        $privArray = $privileges;

        if (!is_array($privArray)) {
            $privArray = explode(',', $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($membership->privileges->all() as $priv) {
            $membership->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            $membership->privileges->add($priv);
        }

        $membership->save();
    }

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
    public function Update($membershipId, $title, $description, $price, $code, $days, $period) {
        $membership = $this->Get($membershipId);

        $membership->title = $title;
        $membership->description = $description;
        $membership->price = $price;
        $membership->code = $code;
        $membership->days = $days;
        $membership->period = $period;

        $membership->save();

        return $membership;
    }

    /**
     * @permission administrator
     *
     * @param $membershipId
     * @param $active
     *
     * @return mixed
     */
    public function UpdateActive($membershipId, $active) {
        $membership = $this->Get($membershipId);

        $membership->active = $active;

        $membership->save();
    }

    /**
     * @permission administrator
     *
     * @param $membershipId
     * @param $private
     *
     * @return mixed
     */
    public function UpdatePrivate($membershipId, $private) {
        $membership = $this->Get($membershipId);

        $membership->private = $private;

        $membership->save();
    }

    /**
     * @permission administrator
     *
     * @param $membershipId
     * @param $recurring
     *
     * @return mixed
     */
    public function UpdateRecurring($membershipId, $recurring) {
        $membership = $this->Get($membershipId);

        $membership->recurring = $recurring;

        $membership->save();
    }

    /**
     * @permission administrator
     *
     * @param $membershipId
     * @param $trial
     *
     * @return mixed
     */
    public function UpdateTrial($membershipId, $trial) {
        $membership = $this->Get($membershipId);

        $membership->trial = $trial;

        $membership->save();
    }
}
