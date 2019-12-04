<?php

namespace app\gateways;


use app\domain\StripeEvent;

class StripeGateway implements IPaymentGateway
{
    public function Name()
    {
        return "stripe";
    }

    public function Process($data)
    {
        //TODO https://stripe.com/docs/api/events/object
        // https://stripe.com/docs/webhooks/signatures
        // receive the stripe events, likely only care about subscription related events and card failures
        // create StripeEvent records
    }

}