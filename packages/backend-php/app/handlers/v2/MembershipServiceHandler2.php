<?php

namespace app\handlers\v2;

use app\contracts\v2\IMembershipService2;
use app\domain\Membership;
use app\domain\Privilege;
use vhs\domain\exceptions\DomainException;
use vhs\exceptions\HttpException;
use vhs\services\Service;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class MembershipServiceHandler2 extends Service implements IMembershipService2 {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
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
     * @throws \vhs\exceptions\HttpException
     *
     * @return void
     */
    public function Create($title, $description, $price, $code, $days, $period): void {
        throw new HttpException('Sorry, no dice!', HttpStatusCodes::Server_Error_Not_Implemented);
    }

    /**
     * @permission administrator
     *
     * @param int $membershipId
     *
     * @return \app\domain\Membership
     */
    public function Get($membershipId): Membership {
        return $this->getMembershipById($membershipId);
    }

    /**
     * @permission administrator
     *
     * @return \app\domain\Membership[]
     */
    public function GetAll(): array {
        return Membership::findAll();
    }

    /**
     * @permission administrator
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\Membership[]
     */
    public function ListMemberships($page, $size, $columns, $order, $filters): array {
        /** @var \app\domain\Membership[] */
        return Membership::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param int             $membershipId
     * @param string|string[] $privileges
     *
     * @return bool
     */
    public function PutPrivileges($membershipId, $privileges): bool {
        $membership = $this->getMembershipById($membershipId);

        $privArray = is_string($privileges) ? explode(',', $privileges) : $privileges;

        $privs = Privilege::findByCodes(...$privArray);

        // TODO fix typing
        /** @disregard P1006 PHP0404 override */
        foreach ($membership->privileges->all() as $priv) {
            // TODO fix typing
            /** @disregard P1006 PHP0404 override */
            $membership->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            // TODO fix typing
            /** @disregard P1006 PHP0404 override */
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
     * @param int    $days
     * @param string $period
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
     * @param bool $privateVal
     *
     * @return bool
     */
    public function UpdatePrivate($membershipId, $privateVal): bool {
        $membership = $this->getMembershipById($membershipId);

        $membership->private = $privateVal;

        return $membership->save();
    }

    /**
     * @permission administrator
     *
     * @param int  $membershipId
     * @param bool $recurring
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
     * @return bool
     */
    public function UpdateTrial($membershipId, $trial): bool {
        $membership = $this->getMembershipById($membershipId);

        $membership->trial = $trial;

        return $membership->save();
    }

    /**
     * getMembershipById.
     *
     * @param int $membershipId
     *
     * @throws \vhs\domain\exceptions\DomainException
     *
     * @return Membership
     */
    private function getMembershipById($membershipId): Membership {
        /** @var Membership|null */
        $membership = Membership::find($membershipId);

        if (is_null($membership)) {
            throw new DomainException(sprintf('Missing membership for queried id: [%s]', $membershipId));
        }

        return $membership;
    }
}
