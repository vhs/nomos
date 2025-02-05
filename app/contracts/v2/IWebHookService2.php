<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:28 AM.
 */

namespace app\contracts\v2;

use app\domain\WebHook;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\IContract;

/** @typescript */
interface IWebHookService2 extends IContract {
    /**
     * @permission administrator|webhook
     *
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountHooks($filters): int;

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $filters
     *
     * @throws string
     *
     * @return int
     */
    public function CountUserHooks($userid, $filters): int;

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
     * @return bool
     */
    public function CreateHook($name, $description, $enabled, $url, $translation, $headers, $method, $eventid): bool;

    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @throws string
     *
     * @return void
     */
    public function DeleteHook($id): void;

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
    public function EnableHook($id, $enabled): bool;

    /**
     * @permission webhook|administrator
     *
     * @throws string
     *
     * @return \app\domain\WebHook[]
     */
    public function GetAllHooks(): array;

    /**
     * @permission user|administrator
     *
     * @param int $id
     *
     * @throws string
     *
     * @return \app\domain\WebHook|null
     */
    public function GetHook($id): WebHook|null;

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
    public function GetHooks($domain, $event): array;

    /**
     * @permission administrator|webhook
     *
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @throws string
     *
     * @return \app\domain\WebHook[]
     */
    public function ListHooks($page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @throws string
     * @throws \Exception
     *
     * @return \app\domain\WebHook[]
     */
    public function ListUserHooks($userid, $page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator|user
     *
     * @param int    $id
     * @param string $privileges
     *
     * @throws string
     *
     * @return bool
     */
    public function PutHookPrivileges($id, $privileges): bool;

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
    public function UpdateHook($id, $name, $description, $enabled, $url, $translation, $headers, $method, $eventid): bool;
}
