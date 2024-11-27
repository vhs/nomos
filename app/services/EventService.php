<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:47 AM
 */

namespace app\services;

use app\contracts\IEventService1;
use app\domain\Event;
use app\domain\Privilege;
use Aws\CloudFront\Exception\Exception;
use vhs\domain\Domain;
use vhs\security\CurrentUser;
use vhs\services\Service;

class EventService extends Service implements IEventService1 {
    /**
     * @permission webhook|administrator
     * @return mixed
     */
    public function GetEvents() {
        return Event::findAll();
    }

    /**
     * @permission administrator
     * @param $id
     * @return mixed
     */
    public function GetEvent($id) {
        $event = Event::find($id);

        if (is_null($event)) {
            throw new Exception('Event does not exist');
        }

        return $event;
    }

    /**
     * @permission administrator
     * @param $name
     * @param $domain
     * @param $event
     * @param $description
     * @param $enabled
     * @return mixed
     */
    public function CreateEvent($name, $domain, $event, $description, $enabled) {
        if (Event::exists($domain, $event)) {
            throw new Exception('Event already exists for code and/or domain.event');
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
     * @param $id
     * @param $enabled
     * @return mixed
     */
    public function EnableEvent($id, $enabled) {
        $event = $this->GetEvent($id);

        $event->enabled = $enabled;

        return $event->save();
    }

    /**
     * @permission administrator
     * @param $id
     * @param $privileges
     * @return mixed
     */
    public function PutEventPrivileges($id, $privileges) {
        $event = $this->GetEvent($id);

        $privArray = $privileges;

        if (!is_array($privArray)) {
            $privArray = explode(',', $privileges);
        }

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
     * @param $id
     * @param $name
     * @param $domain
     * @param $event
     * @param $description
     * @param $enabled
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

    /**
     * @permission administrator
     * @param $id
     * @return mixed
     */
    public function DeleteEvent($id) {
        $event = $this->GetEvent($id);

        return $event->delete();
    }

    /**
     * @permission webhook|administrator
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListEvents($page, $size, $columns, $order, $filters) {
        return Event::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator
     * @param $filters
     * @return int
     */
    public function CountEvents($filters) {
        return Event::count($filters);
    }

    /**
     * @permission user
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
     * @permission webhook|administrator
     * @param $domain
     * @return mixed
     */
    public function GetDomainDefinition($domain) {
        // TODO: Implement GetDomainDefinition() method.
    }
}
