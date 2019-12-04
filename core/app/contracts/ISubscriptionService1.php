<?php

namespace app\contracts;

use vhs\services\IContract;

interface ISubscriptionService1 extends IContract {

    /**
     * @permission administrator|user
     * @param $userid
     * @return mixed
     */
    public function GetUserSubscriptions($userid);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $planid
     * @return mixed
     */
    public function CreatePlanSubscription($userid, $planid);

}
