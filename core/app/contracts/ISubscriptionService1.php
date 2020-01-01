<?php

namespace app\contracts;

use vhs\services\exceptions\InvalidInputException;
use vhs\services\IContract;

class PlanDoesNotExistException extends InvalidInputException {}
class PlanAlreadySubscribedException extends InvalidInputException {}
class SubscriptionDoesNotExistException extends InvalidInputException {}

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
     * @throws CustomerDoesNotExistException
     */
    public function GetUserSubscriptions($userid);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $items
     * @param $paymentmethodid
     * @return mixed
     * @throws CustomerDoesNotExistException
     * @throws PlanDoesNotExistException
     */
    public function CreatePlanSubscription($userid, $items, $paymentmethodid);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $subscriptionid
     * @param $items
     * @param $paymentmethodid
     * @return mixed
     * @throws CustomerDoesNotExistException
     * @throws PlanDoesNotExistException
     * @throws SubscriptionDoesNotExistException
     */
    public function UpdatePlanSubscription($userid, $subscriptionid, $items, $paymentmethodid);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $subscriptionid
     * @return mixed
     * @throws CustomerDoesNotExistException
     * @throws PlanDoesNotExistException
     * @throws SubscriptionDoesNotExistException
     */
    public function CancelPlanSubscription($userid, $subscriptionid);
}
