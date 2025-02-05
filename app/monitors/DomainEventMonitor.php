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

/** @typescript */
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

            /**
             * Updated 2025/01/30 with all valid domain triggers and are returned via the GetEventTypes service method in the EventService1.
             */
            switch ($event->event) {
                case 'before:changed':
                    /**
                     * Intentionally disabled to prevent excessive event generation due to low level triggering.
                     * I.e. Enabling this is noisy AF because it triggers on everything minor field update.
                     **/
                    // $domainClass::onAnyBeforeChange(function (...$args) use ($event) {
                    //     $this->fireEvent($event, $args);
                    // });
                    break;

                case 'before:created':
                    MessageQueue::ensure($event->domain, $event->event);
                    $domainClass::onAnyBeforeCreate(function (...$args) use ($event) {
                        $this->fireEvent($event, $args);
                    });

                    break;

                case 'before:deleted':
                    MessageQueue::ensure($event->domain, $event->event);
                    $domainClass::onAnyBeforeDelete(function (...$args) use ($event) {
                        $this->fireEvent($event, $args);
                    });

                    break;

                case 'before:updated':
                    MessageQueue::ensure($event->domain, $event->event);
                    $domainClass::onAnyBeforeUpdate(function (...$args) use ($event) {
                        $this->fireEvent($event, $args);
                    });

                    break;

                case 'before:saved':
                    MessageQueue::ensure($event->domain, $event->event);
                    $domainClass::onAnyBeforeSave(function (...$args) use ($event) {
                        $this->fireEvent($event, $args);
                    });

                    break;

                case 'changed':
                    /**
                     * Intentionally disabled to prevent excessive event generation due to low level triggering.
                     * I.e. Enabling this is noisy AF because it triggers on everything minor field update.
                     **/
                    // $domainClass::onAnyChanged(function (...$args) use ($event) {
                    //     $this->fireEvent($event, $args);
                    // });
                    break;

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

                default:
                    $logger->log(sprintf('Invalid domain event [%s] for domain [%s]', $event->event, $event->domain));

                    break;
            }
        }
    }
}
