<?php

namespace app\contracts;

use vhs\services\exceptions\InvalidInputException;
use vhs\services\IContract;

class PlanDoesNotExistException extends InvalidInputException {}

interface ISubscriptionService1 extends IContract {

    /**
     * @permission anonymous
     * @return mixed
     */
    public function GetPlans();

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
     * @param $paymentmethodid
     * @return mixed
     */
    public function CreatePlanSubscription($userid, $planid, $paymentmethodid);
}
