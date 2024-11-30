<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 12:24 PM.
 */

namespace app\monitors;

use app\domain\Event;
use vhs\domain\Domain;
use vhs\Logger;
use vhs\messaging\MessageQueue;
use vhs\monitors\Monitor;

class DomainEventMonitor extends Monitor {
    public function fireEvent($event, $data) {
        MessageQueue::publish($event->domain, $event->event, json_encode($data));
    }

    public function Init(Logger &$logger = null) {
        $events = Event::findAll();

        foreach ($events as $event) {
            if (!$event->enabled) {
                continue;
            }

            /** @var Domain $domainClass */
            $domainClass = '\\app\\domain\\' . $event->domain;

            switch ($event->event) {
                /* Lets not support changed because it's super noisy. Throws for each field value change
                 * case "changed":
                    $domainClass::onAnyChanged(function(...$args) use ($event) {
                        $this->fireEvent($event, $args);
                    });
                    break;
                */
                case 'created':
                    MessageQueue::ensure($event->domain, $event->event);
                    $domainClass::onAnyCreated(function (...$args) use ($event) {
                        $this->fireEvent($event, $args);
                    });
                    break;
                case 'deleted':
                    MessageQueue::ensure($event->domain, $event->event);
                    $domainClass::onAnyDeleted(function (...$args) use ($event) {
                        $this->fireEvent($event, $args);
                    });
                    break;
                case 'updated':
                    MessageQueue::ensure($event->domain, $event->event);
                    $domainClass::onAnyUpdated(function (...$args) use ($event) {
                        $this->fireEvent($event, $args);
                    });
                    break;
                case 'saved':
                    MessageQueue::ensure($event->domain, $event->event);
                    $domainClass::onAnySaved(function (...$args) use ($event) {
                        $this->fireEvent($event, $args);
                    });
                    break;
            }
        }
    }
}
