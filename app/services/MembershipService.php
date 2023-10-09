<?php

namespace app\services;

use app\contracts\IMembershipService1;
use app\domain\Membership;
use app\domain\Privilege;
use app\domain\User;
use app\schema\SettingsSchema;
use vhs\database\Database;
use vhs\database\wheres\Where;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

class MembershipService extends Service implements IMembershipService1 {
    public function Create($title, $description, $price, $code, $days, $period) {
        return [];
    }

    public function GetAll() {
        return Membership::findAll();
    }

    public function Get($membershipId) {
        return Membership::find($membershipId);
    }

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

    public function UpdatePrivate($membershipId, $private) {
        $membership = $this->Get($membershipId);

        $membership->private = $private;

        $membership->save();
    }

    public function UpdateRecurring($membershipId, $recurring) {
        $membership = $this->Get($membershipId);

        $membership->recurring = $recurring;

        $membership->save();
    }

    public function UpdateTrial($membershipId, $trial) {
        $membership = $this->Get($membershipId);

        $membership->trial = $trial;

        $membership->save();
    }

    public function UpdateActive($membershipId, $active) {
        $membership = $this->Get($membershipId);

        $membership->active = $active;

        $membership->save();
    }

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
}
