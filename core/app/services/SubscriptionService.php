<?php

namespace app\services;


use app\contracts\ISubscriptionService1;
use app\contracts\IUserService1;
use app\contracts\MustBeAnnonymousException;
use app\contracts\UserExistsException;
use app\domain\Membership;
use app\domain\PasswordResetRequest;
use app\domain\Privilege;
use app\domain\SystemPreference;
use app\domain\User;
use app\security\Authenticate;
use app\security\PasswordUtil;
use app\security\credentials\ActivationCredentials;
use DateTime;
use Stripe\Product;
use vhs\security\CurrentUser;
use vhs\services\Service;
use Stripe\Stripe;
use Stripe\Plan;

class SubscriptionService extends Service implements ISubscriptionService1 {

    private function getStripeSecretAPIKey() {
        return SystemPreference::findByKeyScalar("stripe-api-secret-key")->value;
    }

    private function getStripePublishableAPIKey() {
        return SystemPreference::findByKeyScalar("stripe-api-publishable-key")->value;
    }

    private function initStripe() {
        Stripe::setApiKey($this->getStripeSecretAPIKey());
    }

    public function GetPlans() {
        $this->initStripe();

        $memberships = Membership::findActive();

        $membership_codes = array();

        foreach($memberships as $membership) {
            array_push($membership_codes, $membership->code);
        }

        $stripe_products = Product::all(["active" => true]);

        $products = array();

        foreach($stripe_products->data as $stripe_product) {
            if(in_array($stripe_product["metadata"]["code"], $membership_codes)) {
                array_push($products, $stripe_product);
            }
        }

        foreach($products as $product) {
            $plans = Plan::all(["active" => true, "product" => $product["id"]]);

            $product["plans"] = $plans->data;
        }

        return $products;
    }

    /**
     * @inheritDoc
     */
    public function GetUserSubscriptions($userid)
    {
        // TODO: Implement GetUserSubscriptions() method.

        $this->initStripe();

    }

    /**
     * @inheritDoc
     */
    public function CreatePlanSubscription($userid, $planid)
    {
        // TODO: Implement CreatePlanSubscription() method.
    }
}