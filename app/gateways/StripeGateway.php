<?php

/**
 * Created by PhpStorm.
 * User: TyIsI
 * Date: 2020-11-10
 * Time: 4:12 PM
 */

namespace app\gateways;


use app\domain\StripeEvent;
use \Stripe\Stripe;

class StripeGateway implements IPaymentGateway
{

    public function __construct()
    {
        \Stripe\Stripe::setApiKey(STRIPE_API_KEY);
    }

    public function Name()
    {
        return "stripe";
    }

    public function Process($payload)
    {
        if(!isset($_SERVER['HTTP_STRIPE_SIGNATURE']))
        {
            throw new PaymentGatewayException("Error: Unknown Stripe Event Error: Missing signature");
            http_response_code(400);
            exit();
        }

        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                STRIPE_WEBHOOK_SECRET
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            throw new PaymentGatewayException("Error: Unknown Stripe Event Error " . $payload);
            http_response_code(400);
            exit();
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            throw new PaymentGatewayException("Error: Unknown Stripe Event Error " . $payload);
            http_response_code(400);
            exit();
        } finally {
            // Set up the initial event
            $event_record = $this->CreateStripeEventRecord('UNKNOWN', $event->created, $event->id, $event->type, $event->object, json_encode($event->request), $event->api_version, $payload);

            // Handle the event
            switch ($event->type) {
                case 'invoice.paid':
                    $paymentIntent = $event->data->object; // contains a StripePaymentIntent
                    $event_record->status = 'VALID';
                    $event_record->save();
                    break;
                default:
                    $event_record->save();
                    throw new PaymentGatewayException('Received unknown event type ' . $event->type);
            }

            http_response_code(200);
            return json_encode(array("result"=>"OK"));
        }
    }

    public function CreateStripeEventRecord($status, $created, $event_id, $type, $object, $request, $api_version, $raw)
    {
        // Create the IPN record in the database
        $stripe_event = new StripeEvent();

        $stripe_event->status = $status;
        $stripe_event->created = $created;
        $stripe_event->event_id = $event_id;
        $stripe_event->type = $type;
        $stripe_event->object = $object;
        $stripe_event->request = $request;
        $stripe_event->api_version = $api_version;
        $stripe_event->raw = $raw;

        return $stripe_event;
    }
}
