<?php

namespace app\services;


use app\contracts\CustomerDoesNotExistException;
use app\contracts\ICustomerService1;
use app\domain\SystemPreference;
use Stripe\Customer;
use Stripe\PaymentMethod;
use vhs\security\CurrentUser;
use vhs\services\Service;
use Stripe\Stripe;

class CustomerService extends Service implements ICustomerService1 {

    private function getStripeSecretAPIKey() {
        return SystemPreference::findByKeyScalar("stripe-api-secret-key")->value;
    }

    private function getStripePublishableAPIKey() {
        return SystemPreference::findByKeyScalar("stripe-api-publishable-key")->value;
    }

    private function initStripe() {
        Stripe::setApiKey($this->getStripeSecretAPIKey());
    }

    /**
     * @inheritDoc
     */
    public function GetCustomerProfile($userid)
    {
        if (!(CurrentUser::getIdentity() == $userid || CurrentUser::hasAnyPermissions("administrator"))) {
            return null;
        }

        $user = $this->GetUser($userid);

        if(is_null($user)) return null;

        $this->initStripe();

        $customerid = $user->stripe_id;

        $customer = null;

        if (!is_null($customerid) && !empty($customerid)) {
            $customer = Customer::retrieve($customerid);
        } else {
            if (is_null($user->payment_email) || !empty($user->payment_email)) {
                return null;
            }

            $customers = Customer::all(["email" => $user->payment_email]);

            if (count($customers["data"]) <> 1) {
                return null;
            }

            $customer = $customers["data"][0];
        }

        $paymentMethods = PaymentMethod::all([
            "customer" => $customer->id,
            "type" => "card"
        ]);

        $customer["paymentMethods"] = $paymentMethods["data"];

        return $customer;
    }

    /**
     * @inheritDoc
     */
    public function PutCustomerProfile($userid, $address, $phone)
    {
        if (!(CurrentUser::getIdentity() == $userid || CurrentUser::hasAnyPermissions("administrator"))) {
            return null;
        }

        $user = $this->GetUser($userid);

        if(is_null($user)) return null;

        $this->initStripe();

        $customerid = $user->stripe_id;

        if (!is_null($customerid) && $customerid != "") {
            return Customer::update($customerid, [
                "address" => $address,
                "phone" => $phone
            ]);
        }

        if (is_null($user->payment_email) || $user->payment_email == "") {
            $user->payment_email = $user->email;
        }

        $customer = Customer::create([
            "address" => $address,
            "phone" => $phone,
            "email" => $user->payment_email,
            "name" => $user->fname." ".$user->lname,
            "description" => "VHS nomos customer ".$user->payment_email,
            "metadata" => [
                "nomos_id" => $user->id
            ]
        ]);

        $user->stripe_id = $customer["id"];

        $user->save();

        return $this->GetCustomerProfile($userid);
    }

    /**
     * @inheritDoc
     */
    public function AttachPaymentMethod($userid, $paymentmethodid)
    {
        $customer = $this->GetCustomerProfile($userid);

        if(is_null($customer)) {
            throw new CustomerDoesNotExistException("Customer profile is required");
        }

        $payment_method = PaymentMethod::retrieve($paymentmethodid);
        $payment_method->attach([
            "customer" => $customer["id"]
        ]);

        if (is_null($customer["invoice_settings"]["default_payment_method"])) {
            Customer::update($customer["id"], [
               "invoice_settings" => [
                   "default_payment_method" => $paymentmethodid
               ]
            ]);
        }

        return $this->GetCustomerProfile($userid);
    }

    /**
     * @inheritDoc
     */
    public function SetDefaultPaymentMethod($userid, $paymentmethodid)
    {
        $customer = $this->GetCustomerProfile($userid);

        Customer::update($customer["id"], [
            "invoice_settings" => [
                "default_payment_method" => $paymentmethodid
            ]
        ]);

        return $this->GetCustomerProfile($userid);
    }

    /**
     * @inheritDoc
     */
    public function DetachPaymentMethod($userid, $paymentmethodid)
    {
        $customer = $this->GetCustomerProfile($userid);

        foreach($customer["paymentMethods"] as $paymentMethod) {
            if ($paymentMethod["id"] == $paymentmethodid) {
                $paymentMethod->detach();
            }
        }

        return $this->GetCustomerProfile($userid);
    }
}
