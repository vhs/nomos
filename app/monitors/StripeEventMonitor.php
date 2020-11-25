<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/08/2015
 * Time: 12:56 AM
 */

namespace app\monitors;

use app\domain\StripeEvent;
use app\domain\Payment;
use DateTime;
use vhs\Logger;
use vhs\monitors\Monitor;

class StripeEventMonitor extends Monitor {

    /** @var Logger */
    private $logger;

    public function Init(Logger &$logger = null) {
        $this->logger = &$logger;
        StripeEvent::onAnyCreated([$this, "handleCreated"]);
    }

    public function handleCreated($args) {
        $this->logger->log(__METHOD__ + ": " + json_encode($args, 1));

        /** @var StripeEvent $stripe_event */
        $stripe_event = $args[0];

        if ($stripe_event->status == "VALID") {
            $this->logger->log("We have a valid $stripe_event record, create a transaction, update users, etc");

            $stripe_data = json_decode($stripe_event->raw);

            $txn_id = !is_null($stripe_data->data->object->id) ? $stripe_data->data->object->id : $stripe_event->id;

            if (Payment::exists($txn_id)) {
                $this->logger->log("Payment record already exists for this Stripe transaction.. odd");
                return;
            }

            $payment = new Payment();

            $payment->txn_id = $txn_id;

            $payment->currency = $stripe_data->data->object->currency;
            $payment->pp = "Stripe";
            
            $payment->status = 0; //we haven't yet processed the payment internally
            
            $payment->payer_email = $stripe_data->data->object->customer_email;
            
            $full_name = !is_null($stripe_data->data->object->customer_name) ? $this->split_name($stripe_data->data->object->customer_name) : array($stripe_data->data->object->customer_email, $stripe_data->data->object->customer_email);
            
            $payment->payer_fname = join(" ", array_slice($full_name, 0, count($full_name) - 1));
            $payment->payer_lname = end($full_name);
            
            // Iterate over $stripe_data->data->object->lines->data

            $item_name = "";
            $item_number = "";
            $item_amount = 0.0;

            foreach( $stripe_data->data->object->lines->data as $line_item) {
                $item_name = !is_null($line_item->description)?$line_item->description : $item_name;
                if(isset($line_item->plan))
                    $item_amount = !is_null($line_item->plan->amount)?$line_item->plan->amount/100: $item_amount;
                if(isset($line_item->plan))
                    $item_number =  !is_null($line_item->plan->product)?$line_item->plan->product:$item_number;
                if(isset($line_item->plan))
                    $item_name = !is_null($line_item->plan->nickname)?$line_item->plan->nickname : $item_name;
                if(isset($line_item->price))
                    $item_amount = !is_null($line_item->price->unit_amount/100)?$line_item->price->unit_amount/100: $item_amount;
                if(isset($line_item->price))
                    $item_number =  !is_null($line_item->price->product)?$line_item->price->product:$item_number;
                if(isset($line_item->price))
                    $item_name = !is_null($line_item->price->nickname)?$line_item->price->nickname : $item_name;
            }

            if(array_key_exists($item_number, STRIPE_PRODUCTS)) {
                $item_name = STRIPE_PRODUCTS[$item_number]['item_name'];
                $item_number = STRIPE_PRODUCTS[$item_number]['item_number'];
            }

            $payment->rate_amount = $item_amount;
            $payment->item_number = $item_number;
            $payment->item_name = $item_name;

            $ts = $stripe_event->created;

            if (is_numeric($ts)) {
                $date = new DateTime("@$ts");
            } else {
                $date = new DateTime($ts);
            }

            $payment->date = $date->format("Y-m-d H:i:s");

            $payment->save();
        }
    }

    /**
     * Sourced from: https://stackoverflow.com/a/31330346
     */
    private function split_name($name)
    {
        $name = trim($name);
        $last_name = (strpos($name, ' ') === false) ? '' : preg_replace('#.*\s([\w-]*)$#', '$1', $name);
        $first_name = trim(preg_replace('#' . preg_quote($last_name, '#') . '#', '', $name));
        return array($first_name, $last_name);
    }
}
