<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:47 AM.
 */

namespace app\services;

use app\contracts\IEventService1;
use app\domain\Event;
use app\domain\Privilege;
use app\exceptions\InvalidInputException;
use vhs\security\CurrentUser;
use vhs\services\Service;

/** @typescript */
class EventService extends Service implements IEventService1 {
    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountEvents($filters) {
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
     * @return mixed
     */
    public function CreateEvent($name, $domain, $event, $description, $enabled) {
        if (Event::exists($domain, $event)) {
            throw new InvalidInputException('Event already exists for code and/or domain.event');
        }

        $evt = new Event();

        $evt->name = $name;
        $evt->domain = $domain;
        $evt->event = $event;
        $evt->description = $description;
        $evt->enabled = $enabled;

        return $evt->save();
    }

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return mixed
     */
    public function DeleteEvent($id) {
        $event = $this->GetEvent($id);

        return $event->delete();
    }

    /**
     * @permission administrator
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return mixed
     */
    public function EnableEvent($id, $enabled) {
        $event = $this->GetEvent($id);

        $event->enabled = $enabled;

        return $event->save();
    }

    /**
     * @permission user
     *
     * @return mixed
     */
    public function GetAccessibleEvents() {
        $events = $this->GetEvents();

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
     * @return mixed
     */
    public function GetDomainDefinition($domain) {
        // TODO: Implement GetDomainDefinition() method.
    }

    /**
     * @permission webhook|administrator
     *
     * @return mixed
     */
    public function GetDomainDefinitions() {
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
     * @throws \app\exceptions\InvalidInputException
     *
     * @return mixed
     */
    public function GetEvent($id) {
        $event = Event::find($id);

        if (is_null($event)) {
            throw new InvalidInputException('Event does not exist');
        }

        return $event;
    }

    /**
     * @permission webhook|administrator
     *
     * @return mixed
     */
    public function GetEvents() {
        return Event::findAll();
    }

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetEventTypes() {
        $updateKeys = array_filter(get_class_methods('vhs\domain\Domain'), function ($k) {
            return preg_match('/^onAny/', $k);
        });

        sort($updateKeys);

        return array_map(fn($method): string => str_replace('before', 'before:', strtolower(str_replace('onAny', '', $method))), $updateKeys);
    }

    /**
     * @permission webhook|administrator
     *
     * @param int                            $page
     * @param int                            $size
     * @param string                         $columns
     * @param string                         $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function ListEvents($page, $size, $columns, $order, $filters) {
        return Event::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $privileges
     *
     * @return void
     */
    public function PutEventPrivileges($id, $privileges) {
        $event = $this->GetEvent($id);

        $privArray = is_string($privileges) ? explode(',', $privileges) : $privileges;

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($event->privileges->all() as $priv) {
            $event->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            $event->privileges->add($priv);
        }

        $event->save();
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
     * @return mixed
     */
    public function UpdateEvent($id, $name, $domain, $event, $description, $enabled) {
        $evt = $this->GetEvent($id);

        $evt->name = $name;
        $evt->domain = $domain;
        $evt->event = $event;
        $evt->description = $description;
        $evt->enabled = $enabled;

        return $evt->save();
    }
}
