<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 12:02 PM.
 */

namespace app\services;

use app\contracts\IWebHookService1;
use app\domain\Privilege;
use app\domain\WebHook;
use app\exceptions\MemberCardException;
use vhs\domain\Filter;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

/** @typescript */
class WebHookService extends Service implements IWebHookService1 {
    /**
     * @permission administrator|webhook
     *
     * @param $filters
     *
     * @return int
     */
    public function CountHooks($filters) {
        return WebHook::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $filters
     *
     * @return int
     */
    public function CountUserHooks($userid, $filters) {
        $filters = $this->AddUserIDToFilters($userid, $filters);

        return WebHook::count($filters);
    }

    /**
     * @permission user
     *
     * @param $name
     * @param $description
     * @param $enabled
     * @param $url
     * @param $translation
     * @param $headers
     * @param $method
     * @param $eventid
     *
     * @throws UnauthorizedException
     *
     * @return mixed
     */
    public function CreateHook($name, $description, $enabled, $url, $translation, $headers, $method, $eventid) {
        $event = (new EventService($this->context))->GetEvent($eventid);

        $codes = [];
        foreach ($event->privileges->all() as $priv) {
            array_push($codes, $priv->code);
        }

        if (!CurrentUser::hasAllPermissions('administrator') && (count($codes) == 0 || !CurrentUser::hasAllPermissions($codes))) {
            throw new UnauthorizedException('Insufficient privileges to subscribe to event');
        }

        $hook = new WebHook();

        $hook->name = $name;
        $hook->description = $description;
        $hook->enabled = $enabled;
        $hook->url = $url;
        $hook->translation = $translation;
        $hook->headers = $headers;
        $hook->method = $method;
        $hook->event = $event;
        $hook->userid = CurrentUser::getIdentity();

        return $hook->save();
    }

    /**
     * @permission administrator|user
     *
     * @param $id
     *
     * @return mixed
     */
    public function DeleteHook($id) {
        $hook = $this->GetHook($id);

        if (is_null($hook)) {
            return;
        }

        $hook->delete();
    }

    /**
     * @permission administrator|user
     *
     * @param $id
     * @param $enabled
     *
     * @return mixed
     */
    public function EnableHook($id, $enabled) {
        $hook = $this->GetHook($id);

        if (is_null($hook)) {
            return;
        }

        $hook->enabled = $enabled;

        $hook->save();
    }

    /**
     * @permission webhook|administrator
     *
     * @return mixed
     */
    public function GetAllHooks() {
        return WebHook::findAll();
    }

    /**
     * @permission user|administrator
     *
     * @param $id
     *
     * @return mixed
     */
    public function GetHook($id) {
        $hook = WebHook::find($id);

        if (is_null($hook)) {
            return null;
        }

        if (CurrentUser::getIdentity() == $hook->userid || CurrentUser::hasAnyPermissions('administrator')) {
            return $hook;
        }

        return null;
    }

    /**
     * @permission webhook|administrator
     *
     * @param $domain
     * @param $event
     *
     * @return mixed
     */
    public function GetHooks($domain, $event) {
        return WebHook::findByDomainEvent($domain, $event);
    }

    /**
     * @permission administrator|webhook
     *
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return mixed
     */
    public function ListHooks($page, $size, $columns, $order, $filters) {
        return WebHook::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @throws \Exception
     *
     * @return mixed
     */
    public function ListUserHooks($userid, $page, $size, $columns, $order, $filters) {
        $filters = $this->AddUserIDToFilters($userid, $filters);

        $cols = explode(',', $columns);

        array_push($cols, 'userid');

        $columns = implode(',', array_unique($cols));

        return WebHook::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator|user
     *
     * @param $id
     * @param $privileges
     *
     * @return mixed
     */
    public function PutHookPrivileges($id, $privileges) {
        $hook = $this->GetHook($id);

        if (is_null($hook)) {
            return;
        }

        $privArray = $privileges;

        if (!is_array($privArray)) {
            $privArray = explode(',', $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($hook->privileges->all() as $priv) {
            $hook->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            if (CurrentUser::hasAnyPermissions('administrator') || CurrentUser::hasAnyPermissions($priv->code)) {
                $hook->privileges->add($priv);
            }
        }

        $hook->save();
    }

    /**
     * @permission administrator|user
     *
     * @param $id
     * @param $name
     * @param $description
     * @param $enabled
     * @param $url
     * @param $translation
     * @param $headers
     * @param $method
     * @param $eventid
     *
     * @return mixed
     */
    public function UpdateHook($id, $name, $description, $enabled, $url, $translation, $headers, $method, $eventid) {
        $hook = $this->GetHook($id);

        if (is_null($hook)) {
            return;
        }

        $event = (new EventService($this->context))->GetEvent($eventid);

        $hook->name = $name;
        $hook->description = $description;
        $hook->enabled = $enabled;
        $hook->url = $url;
        $hook->translation = $translation;
        $hook->headers = $headers;
        $hook->method = $method;
        $hook->event = $event;

        $hook->save();
    }

    private function AddUserIDToFilters($userid, $filters) {
        $userService = new UserService();
        $user = $userService->GetUser($userid);

        if (is_string($filters)) {
            //todo total hack.. this is to support GET params for downloading payments
            $filters = json_decode($filters);
        }

        if (is_null($user)) {
            throw new UnauthorizedException('User not found or you do not have access');
        }

        $userFilter = Filter::Equal('userid', $user->id);

        if (is_null($filters) || $filters == '') {
            $filters = $userFilter;
        } else {
            $filters = Filter::_And($userFilter, $filters);
        }

        return $filters;
    }
}
