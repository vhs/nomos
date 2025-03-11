<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 12:02 PM.
 */

namespace app\handlers\v2;

use app\contracts\v2\IWebHookService2;
use app\domain\Privilege;
use app\domain\WebHook;
use vhs\domain\Filter;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

/** @typescript */
class WebHookServiceHandler2 extends Service implements IWebHookService2 {
    /**
     * @permission administrator|webhook
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountHooks($filters): int {
        return WebHook::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param \vhs\domain\Filter|null $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountUserHooks($userid, $filters): int {
        $filters = $this->addUserIDToFilters($userid, $filters);

        return WebHook::count($filters);
    }

    /**
     * @permission user
     *
     * @param string $name
     * @param string $description
     * @param bool   $enabled
     * @param string $url
     * @param string $translation
     * @param string $headers
     * @param string $method
     * @param int    $eventid
     *
     * @throws string
     * @throws UnauthorizedException
     *
     * @return \app\domain\WebHook
     */
    public function CreateHook($name, $description, $enabled, $url, $translation, $headers, $method, $eventid): WebHook {
        $event = (new EventServiceHandler2($this->context))->GetEvent($eventid);

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

        $hook->save();

        return $hook;
    }

    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @throws string
     *
     * @return void
     */
    public function DeleteHook($id): void {
        $hook = $this->getWebHookById($id);

        $hook->delete();
    }

    /**
     * @permission administrator|user
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @throws string
     *
     * @return bool
     */
    public function EnableHook($id, $enabled): bool {
        $hook = $this->getWebHookById($id);

        $hook->enabled = $enabled;

        return $hook->save();
    }

    /**
     * @permission webhook|administrator
     *
     * @throws string
     *
     * @return \app\domain\WebHook[]
     */
    public function GetAllHooks(): array {
        return WebHook::findAll();
    }

    /**
     * @permission user|administrator
     *
     * @param int $id
     *
     * @throws string
     *
     * @return \app\domain\WebHook|null
     */
    public function GetHook($id): WebHook|null {
        return $this->getWebHookById($id);
    }

    /**
     * @permission webhook|administrator
     *
     * @param string $domain
     * @param string $event
     *
     * @throws string
     *
     * @return \app\domain\WebHook[]
     */
    public function GetHooks($domain, $event): array {
        return WebHook::findByDomainEvent($domain, $event);
    }

    /**
     * @permission administrator|webhook
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @throws string
     *
     * @return \app\domain\WebHook[]
     */
    public function ListHooks($page, $size, $columns, $order, $filters): array {
        return WebHook::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @throws string
     * @throws \Exception
     *
     * @return \app\domain\WebHook[]
     */
    public function ListUserHooks($userid, $page, $size, $columns, $order, $filters): array {
        $filters = $this->addUserIDToFilters($userid, $filters);

        $cols = explode(',', $columns);

        array_push($cols, 'userid');

        $columns = implode(',', array_unique($cols));

        return WebHook::page($page, $size, $columns, $order, $filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int             $id
     * @param string|string[] $privileges
     *
     * @throws string
     *
     * @return bool
     */
    public function PutHookPrivileges($id, $privileges): bool {
        $hook = $this->getWebHookById($id);

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

        return $hook->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int    $id
     * @param string $name
     * @param string $description
     * @param bool   $enabled
     * @param string $url
     * @param string $translation
     * @param string $headers
     * @param string $method
     * @param int    $eventid
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateHook($id, $name, $description, $enabled, $url, $translation, $headers, $method, $eventid): bool {
        $hook = $this->getWebHookById($id);

        $event = (new EventServiceHandler2($this->context))->GetEvent($eventid);

        $hook->name = $name;
        $hook->description = $description;
        $hook->enabled = $enabled;
        $hook->url = $url;
        $hook->translation = $translation;
        $hook->headers = $headers;
        $hook->method = $method;
        $hook->event = $event;

        return $hook->save();
    }

    private function addUserIDToFilters($userid, $filters): Filter {
        $userService2 = new UserServiceHandler2();

        $user = $userService2->GetUser($userid);

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

    /**
     * getWebHookById.
     *
     * @param mixed $id
     *
     * @throws string
     *
     * @return \app\domain\WebHook
     */
    private function getWebHookById($id): WebHook {
        $pref = WebHook::find($id);

        if (is_null($pref)) {
            $this->throwNotFound('WebHook');
        }

        return $pref;
    }
}
