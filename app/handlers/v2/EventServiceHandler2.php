<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:47 AM.
 */

namespace app\handlers\v2;

use app\constants\Errors;
use app\contracts\v2\IEventService2;
use app\domain\Event;
use app\domain\Privilege;
use app\exceptions\InvalidInputException;
use vhs\security\CurrentUser;
use vhs\services\Service;

/** @typescript */
class EventServiceHandler2 extends Service implements IEventService2 {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountEvents($filters): int {
        return Event::count($filters);
    }

    /**
     * @permission administrator
     *
     * @param string $name
     * @param string $domain
     * @param string $event
     * @param string $description
     * @param bool   $enabled
     *
     * @throws \app\exceptions\InvalidInputException
     *
     * @return \app\domain\Event
     */
    public function CreateEvent($name, $domain, $event, $description, $enabled): Event {
        if (Event::exists($domain, $event)) {
            throw new InvalidInputException('Event already exists for code and/or domain.event');
        }

        $evt = new Event();

        $evt->name = $name;
        $evt->domain = $domain;
        $evt->event = $event;
        $evt->description = $description;
        $evt->enabled = $enabled;

        $evt->save();

        return $evt;
    }

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return void
     */
    public function DeleteEvent($id): void {
        $event = $this->getEventById($id);

        $event->delete();
    }

    /**
     * @permission administrator
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return bool
     */
    public function EnableEvent($id, $enabled): bool {
        $evt = $this->getEventById($id);

        $evt->enabled = $enabled;

        return $evt->save();
    }

    /**
     * @permission user
     *
     * @return \app\domain\Event[]
     */
    public function GetAccessibleEvents(): array {
        $events = Event::findAll();

        if (CurrentUser::hasAllPermissions('administrator')) {
            return $events;
        }

        $retval = [];

        foreach ($events as $event) {
            $privs = [];
            foreach ($event->privileges->all() as $priv) {
                array_push($privs, $priv->code);
            }

            if (CurrentUser::hasAllPermissions(...$privs)) {
                array_push($retval, $event);
            }
        }

        return $retval;
    }

    /**
     * @permission webhook|administrator
     *
     * @param string $domain
     *
     * @return void
     */
    public function GetDomainDefinition($domain): void {
        // TODO: Implement GetDomainDefinition() method.
    }

    /**
     * @permission webhook|administrator
     *
     * @return mixed
     */
    public function GetDomainDefinitions(): mixed {
        foreach (glob('domain/*.php') as $filename) {
            include_once $filename;
        }

        $domains = [];

        foreach (get_declared_classes() as $class) {
            if (is_subclass_of($class, '\\vhs\\domain\\Domain')) {
                $name = str_replace('app\\domain\\', '', $class);
                $domains[$name] = [
                    'checks' => $class::Schema()->Table()->checks
                ];
            }
        }

        return $domains;
    }

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return \app\domain\Event
     */
    public function GetEvent($id): Event {
        return $this->getEventById($id);
    }

    /**
     * @permission webhook|administrator
     *
     * @return \app\domain\Event[]
     */
    public function GetEvents(): array {
        return Event::findAll();
    }

    /**
     * @permission administrator
     *
     * @return string[]
     */
    public function GetEventTypes(): array {
        $updateKeys = array_filter(get_class_methods('vhs\domain\Domain'), function ($k) {
            return preg_match('/^onAny/', $k);
        });

        sort($updateKeys);

        return array_map(fn($method): string => str_replace('before', 'before:', strtolower(str_replace('onAny', '', $method))), $updateKeys);
    }

    /**
     * @permission webhook|administrator
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\Event[]
     */
    public function ListEvents($page, $size, $columns, $order, $filters): array {
        /** @var \app\domain\Event[] */
        return Event::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param int             $id
     * @param string|string[] $privileges
     *
     * @return bool
     */
    public function PutEventPrivileges($id, $privileges): bool {
        $evt = $this->getEventById($id);

        $privArray = $privileges;

        if (!is_array($privArray)) {
            $privArray = explode(',', $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($evt->privileges->all() as $priv) {
            $evt->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            $evt->privileges->add($priv);
        }

        return $evt->save();
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $name
     * @param string $domain
     * @param string $event
     * @param string $description
     * @param bool   $enabled
     *
     * @return bool
     */
    public function UpdateEvent($id, $name, $domain, $event, $description, $enabled): bool {
        $evt = $this->getEventById($id);

        $evt->name = $name;
        $evt->domain = $domain;
        $evt->event = $event;
        $evt->description = $description;
        $evt->enabled = $enabled;

        return $evt->save();
    }

    /**
     * Summary of getEventById.
     *
     * @param int $id
     *
     * @throws \app\exceptions\InvalidInputException
     *
     * @return \app\domain\Event
     */
    private function getEventById($id): Event {
        /** @var \app\domain\Event|null */
        $evt = Event::find($id);

        if (is_null($evt)) {
            throw new InvalidInputException(Errors::E_INVALID_EVENT);
        }

        return $evt;
    }
}
