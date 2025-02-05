<?php

namespace app\handlers\v2;

use app\contracts\v2\IMembershipService2;
use app\domain\Membership;
use app\domain\Privilege;
use vhs\services\Service;

/** @typescript */
class MembershipServiceHandler2 extends Service implements IMembershipService2 {
    /**
     * @permission administrator
     *
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountMemberships($filters): int {
        return Membership::count($filters);
    }

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
     */
    public function Create($title, $description, $price, $code, $days, $period): void {
        // void
    }

    /**
     * @permission administrator
     *
     * @param int $membershipId
     *
     * @throws string
     *
     * @return \app\domain\Membership
     */
    public function Get($membershipId): Membership {
        return Membership::find($membershipId);
    }

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\Membership[]
     */
    public function GetAll(): array {
        return Membership::findAll();
    }

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
    public function ListMemberships($page, $size, $columns, $order, $filters): array {
        return Membership::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param int    $membershipId
     * @param string $privileges
     *
     * @throws string
     *
     * @return bool
     */
    public function PutPrivileges($membershipId, $privileges): bool {
        $membership = $this->getMembershipById($membershipId);

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

        return $membership->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $membershipId
     * @param string $title
     * @param string $description
     * @param int    $price
     * @param string $code
     * @param string $days
     * @param string $period
     *
     * @throws string
     *
     * @return bool
     */
    public function Update($membershipId, $title, $description, $price, $code, $days, $period): bool {
        $membership = $this->getMembershipById($membershipId);

        $membership->title = $title;
        $membership->description = $description;
        $membership->price = $price;
        $membership->code = $code;
        $membership->days = $days;
        $membership->period = $period;

        return $membership->save();
    }

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
    public function UpdateActive($membershipId, $active): bool {
        $membership = $this->getMembershipById($membershipId);

        $membership->active = $active;

        return $membership->save();
    }

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
    public function UpdatePrivate($membershipId, $private): bool {
        $membership = $this->getMembershipById($membershipId);

        $membership->private = $private;

        return $membership->save();
    }

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
    public function UpdateRecurring($membershipId, $recurring): bool {
        $membership = $this->getMembershipById($membershipId);

        $membership->recurring = $recurring;

        return $membership->save();
    }

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
    public function UpdateTrial($membershipId, $trial): bool {
        $membership = $this->getMembershipById($membershipId);

        $membership->trial = $trial;

        return $membership->save();
    }

    private function getMembershipById($membershipId): Membership {
        return Membership::find($membershipId);
    }
}
