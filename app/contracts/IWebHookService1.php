<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:28 AM.
 */

namespace app\contracts;

use vhs\services\IContract;

interface IWebHookService1 extends IContract {
    /**
     * @permission administrator|webhook
     *
     * @param $filters
     *
     * @return int
     */
    public function CountHooks($filters);

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $filters
     *
     * @return int
     */
    public function CountUserHooks($userid, $filters);

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
     * @return mixed
     *
     * @throws UnauthorizedException
     */
    public function CreateHook($name, $description, $enabled, $url, $translation, $headers, $method, $eventid);

    /**
     * @permission administrator|user
     *
     * @param $id
     *
     * @return mixed
     */
    public function DeleteHook($id);

    /**
     * @permission administrator|user
     *
     * @param $id
     * @param $enabled
     *
     * @return mixed
     */
    public function EnableHook($id, $enabled);

    /**
     * @permission webhook|administrator
     *
     * @return mixed
     */
    public function GetAllHooks();

    /**
     * @permission user|administrator
     *
     * @param $id
     *
     * @return mixed
     */
    public function GetHook($id);

    /**
     * @permission webhook|administrator
     *
     * @param $domain
     * @param $event
     *
     * @return mixed
     */
    public function GetHooks($domain, $event);

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
    public function ListHooks($page, $size, $columns, $order, $filters);

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
     * @return mixed
     *
     * @throws \Exception
     */
    public function ListUserHooks($userid, $page, $size, $columns, $order, $filters);

    /**
     * @permission administrator|user
     *
     * @param $id
     * @param $privileges
     *
     * @return mixed
     */
    public function PutHookPrivileges($id, $privileges);

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
    public function UpdateHook($id, $name, $description, $enabled, $url, $translation, $headers, $method, $eventid);
}
