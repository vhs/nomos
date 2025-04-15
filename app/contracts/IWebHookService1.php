<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:28 AM.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IWebHookService1 extends IContract {
    /**
     * @permission administrator|webhook
     *
     * @param mixed $filters
     *
     * @return int
     */
    public function CountHooks($filters);

    /**
     * @permission administrator|user
     *
     * @param int   $userid
     * @param mixed $filters
     *
     * @return int
     */
    public function CountUserHooks($userid, $filters);

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
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return mixed
     */
    public function CreateHook($name, $description, $enabled, $url, $translation, $headers, $method, $eventid);

    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @return mixed
     */
    public function DeleteHook($id);

    /**
     * @permission administrator|user
     *
     * @param int  $id
     * @param bool $enabled
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
     * @param int $id
     *
     * @return mixed
     */
    public function GetHook($id);

    /**
     * @permission webhook|administrator
     *
     * @param string $domain
     * @param mixed  $event
     *
     * @return mixed
     */
    public function GetHooks($domain, $event);

    /**
     * @permission administrator|webhook
     *
     * @param int   $page
     * @param int   $size
     * @param mixed $columns
     * @param mixed $order
     * @param mixed $filters
     *
     * @return mixed
     */
    public function ListHooks($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator|user
     *
     * @param int   $userid
     * @param int   $page
     * @param int   $size
     * @param mixed $columns
     * @param mixed $order
     * @param mixed $filters
     *
     * @return mixed
     */
    public function ListUserHooks($userid, $page, $size, $columns, $order, $filters);

    /**
     * @permission administrator|user
     *
     * @param int   $id
     * @param mixed $privileges
     *
     * @return mixed
     */
    public function PutHookPrivileges($id, $privileges);

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
     * @return mixed
     */
    public function UpdateHook($id, $name, $description, $enabled, $url, $translation, $headers, $method, $eventid);
}
