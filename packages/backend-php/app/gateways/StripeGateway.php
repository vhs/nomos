<?php

/**
 * Authors:
 * - Ty Eggen
 */

namespace app\gateways;

use app\domain\StripeEvent;
use Stripe\Stripe;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class StripeGateway implements IPaymentGateway {
    public function __construct() {
        Stripe::setApiKey(STRIPE_API_KEY);
    }

    /**
     * CreateStripeEventRecord.
     *
     * @param mixed $status
     * @param mixed $created
     * @param mixed $event_id
     * @param mixed $type
     * @param mixed $object
     * @param mixed $request
     * @param mixed $api_version
     * @param mixed $raw
     *
     * @return StripeEvent
     */
    public function CreateStripeEventRecord($status, $created, $event_id, $type, $object, $request, $api_version, $raw) {
        // Create the IPN record in the database
        /** @var \app\domain\StripeEvent $stripe_event */
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

    /**
     * Name.
     *
     * @return string
     */
    public function Name() {
        return 'stripe';
    }

    /**
     * Process.
     *
     * @param mixed $payload
     *
     * @throws \app\gateways\PaymentGatewayException
     *
     * @return mixed
     */
    public function Process($payload) {
        if (!isset($_SERVER['HTTP_STRIPE_SIGNATURE'])) {
            http_response_code(HttpStatusCodes::Client_Error_Bad_Request->value);

            throw new PaymentGatewayException('Error: Unknown Stripe Event Error: Missing signature');
            // return;
        }

        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sig_header, STRIPE_WEBHOOK_SECRET);

            // Set up the initial event
            $event_record = $this->CreateStripeEventRecord(
                'UNKNOWN',
                $event->created,
                $event->id,
                $event->type,
                $event->object,
                json_encode($event->request),
                $event->api_version,
                $payload
            );

            // Handle the event
            switch ($event->type) {
                case 'invoice.paid':
                    // @phpstan-ignore property.notFound
                    $paymentIntent = $event->data->object; // contains a StripePaymentIntent
                    $event_record->status = 'VALID';
                    $event_record->save();

                    break;
                default:
                    $event_record->save();

                    throw new PaymentGatewayException('Received unknown event type ' . $event->type);
            }

            http_response_code(200);

            return json_encode(['result' => 'OK']);
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            http_response_code(HttpStatusCodes::Client_Error_Bad_Request->value);

            return new PaymentGatewayException('Error: Unknown Stripe Event Error ' . $payload);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            http_response_code(HttpStatusCodes::Client_Error_Bad_Request->value);

            return new PaymentGatewayException('Error: Unknown Stripe Event Error ' . $payload);
        }
    }
}
