<?php

namespace app\services;


use app\contracts\CustomerDoesNotExistException;
use app\contracts\ISubscriptionService1;
use app\contracts\PlanAlreadySubscribedException;
use app\contracts\PlanDoesNotExistException;
use app\contracts\SubscriptionDoesNotExistException;
use app\domain\Membership;
use Stripe\Plan;
use Stripe\Product;
use Stripe\Subscription;
use vhs\services\Service;

class SubscriptionService extends Service implements ISubscriptionService1 {
    /**
     * @inheritDoc
     */
    public function GetPlans() {
        $memberships = Membership::findActive();

        $membership_codes = array();

        foreach($memberships as $membership) {
            array_push($membership_codes, $membership->code);
        }

        $stripe_products = Product::all(["active" => true, "type" => "service"]);

        $products = array();

        foreach($stripe_products->data as $stripe_product) {
            if(!is_null($stripe_product["metadata"]["membership"]) && in_array($stripe_product["metadata"]["membership"], $membership_codes)) {
                array_push($products, $stripe_product);
            }

            // TODO collect available add ons
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
        $CustomerService = new CustomerService($this->context);

        $customer = $CustomerService->GetCustomerProfile($userid);

        if (is_null($customer)) throw new CustomerDoesNotExistException("Customer profile is required");

        $subscriptions = Subscription::all([
            "customer" => $customer["id"],
            "expand" => ["data.latest_invoice.payment_intent"]
        ]);

        return $subscriptions["data"];
    }

    /**
     * @inheritDoc
     */
    public function CreatePlanSubscription($userid, $items, $paymentmethodid)
    {
        $customer = (new CustomerService($this->context))->GetCustomerProfile($userid);

        if (is_null($customer)) throw new CustomerDoesNotExistException("Customer profile is required");

        $plans = array();
        $itemMap = array();

        foreach($items as $item) {
            $plan = Plan::retrieve($item->id, [
                "expand" => ["product"]
            ]);

            if (is_null($plan) || $plan["active"] !== true) {
                throw new PlanDoesNotExistException("Invalid plan");
            }

            $plan["quantity"] = $item->quantity;

            array_push($plans, $plan);
            array_push($itemMap, [
                "plan" => $plan["id"],
                "quantity" => $item->quantity
            ]);
        }

        $subscriptions = $this->GetUserSubscriptions($userid);

        // prevent duplicate membership subscriptions
        if (!is_null($subscriptions) && count($subscriptions) <> 0) {
            foreach($subscriptions as $sub) {
                foreach($plans as $plan) {
                    if (!is_null($plan["product"]["metadata"]["membership"])) {
                        foreach ($sub["items"]["data"] as $item) {
                            if ($item["plan"]["product"] === $plan["product"]["id"]) {
                                throw new PlanAlreadySubscribedException("Plan subscription already exists");
                            }
                        }
                    }
                }
            }
        }

        $subscription = Subscription::create([
            "customer" => $customer["id"],
            "default_payment_method" => $paymentmethodid,
            "items" => $itemMap,
            "expand" => ["latest_invoice.payment_intent"]
        ]);

        return $subscription;
    }

    /**
     * @inheritDoc
     */
    public function UpdatePlanSubscription($userid, $subscriptionid, $items, $paymentmethodid)
    {
        $customer = (new CustomerService($this->context))->GetCustomerProfile($userid);

        if (is_null($customer)) throw new CustomerDoesNotExistException("Customer profile is required");

        $plans = array();
        $itemMap = array();

        foreach($items as $item) {
            $plan = Plan::retrieve($item["id"]);

            if (is_null($plan) || $plan["active"] !== true) {
                throw new PlanDoesNotExistException("Invalid plan");
            }

            $plan["quantity"] = $item["quantity"];

            array_push($plans, $plan);
            array_push($itemMap, [
                "plan" => $plan["id"],
                "quantity" => $item->quantity
            ]);
        }

        $subscription = Subscription::retrieve($subscriptionid);

        if (is_null($subscription)) {
            throw new SubscriptionDoesNotExistException("Invalid subscription");
        }

        $subscription = Subscription::update($subscriptionid, [
            "items" => $itemMap,
            "expand" => ["latest_invoice.payment_intent"]
        ]);

        return $subscription;
    }

    /**
     * @inheritDoc
     */
    public function CancelPlanSubscription($userid, $subscriptionid)
    {
        $customer = (new CustomerService($this->context))->GetCustomerProfile($userid);

        if (is_null($customer)) throw new CustomerDoesNotExistException("Customer profile is required");

        $subscription = Subscription::retrieve($subscriptionid);

        if (is_null($subscription)) {
            throw new SubscriptionDoesNotExistException("Invalid subscription");
        }

        return $subscription->delete();
    }
}
