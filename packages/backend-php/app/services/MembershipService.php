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
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function CountMemberships($filters) {
        return Membership::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param string $title
     * @param string $description
     * @param float  $price
     * @param string $code
     * @param int    $days
     * @param string $period
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
     * @param int $membershipId
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
     * @param int                            $page
     * @param int                            $size
     * @param string                         $columns
     * @param string                         $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function ListMemberships($page, $size, $columns, $order, $filters) {
        return Membership::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param int             $membershipId
     * @param string|string[] $privileges
     *
     * @return void
     */
    public function PutPrivileges($membershipId, $privileges) {
        $membership = $this->Get($membershipId);

        $privArray = is_string($privileges) ? explode(',', $privileges) : $privileges;

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($membership->privileges->all() as $priv) {
            $membership->privileges->remove($priv);
        }

        if (!empty($privs)) {
            foreach ($privs as $priv) {
                $membership->privileges->add($priv);
            }
        }

        $membership->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $membershipId
     * @param string $title
     * @param string $description
     * @param float  $price
     * @param string $code
     * @param int    $days
     * @param string $period
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
     * @param int  $membershipId
     * @param bool $active
     *
     * @return void
     */
    public function UpdateActive($membershipId, $active) {
        $membership = $this->Get($membershipId);

        $membership->active = $active;

        $membership->save();
    }

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $private
     *
     * @return void
     */
    public function UpdatePrivate($membershipId, $private) {
        $membership = $this->Get($membershipId);

        $membership->private = $private;

        $membership->save();
    }

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $recurring
     *
     * @return void
     */
    public function UpdateRecurring($membershipId, $recurring) {
        $membership = $this->Get($membershipId);

        $membership->recurring = $recurring;

        $membership->save();
    }

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $trial
     *
     * @return void
     */
    public function UpdateTrial($membershipId, $trial) {
        $membership = $this->Get($membershipId);

        $membership->trial = $trial;

        $membership->save();
    }
}
