<?php

namespace app\services;


use app\contracts\IPaymentMethodService1;
use app\domain\SystemPreference;
use vhs\security\CurrentUser;
use vhs\services\Service;
use Stripe\Stripe;

class PaymentMethodService extends Service implements IPaymentMethodService1  {

    private function getStripeSecretAPIKey() {
        return SystemPreference::findByKeyScalar("stripe-api-secret-key");
    }

    private function getStripePublishableAPIKey() {
        return SystemPreference::findByKeyScalar("stripe-api-publishable-key");
    }

    private function initStripe() {
        Stripe::setApiKey($this->getStripeSecretAPIKey());
    }

    public function GetAllUserPaymentMethods($userid)
    {
        // if stripe user, load all payment methods
    }

    public function AttachUserPaymentMethod($userid, $paymentmethodid)
    {
        // get user
        // if doesnt have stripe_id create Stripe\Customer::create
        // use the payment method id as the default payment method
    }

    public function RemoveUserPaymentMethod($userid, $paymentmethodid)
    {
        // load the customer stripe_id from the user
        // if stripe user remove payment method
    }

    public function UpdateUserPaymentMethod($userid, $paymentmethodid, $details)
    {
        // load the customer stripe_id from the user
        // if stripe user
        // load payment method check if exists, update details
    }
}

