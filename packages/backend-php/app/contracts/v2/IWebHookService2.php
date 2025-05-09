<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:28 AM.
 */

namespace app\contracts\v2;

use app\domain\WebHook;
use vhs\services\IContract;

/** @typescript */
interface IWebHookService2 extends IContract {
    /**
     * @permission administrator|webhook
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountHooks($filters): int;

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param \vhs\domain\Filter|null $filters
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
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \app\domain\WebHook
     */
    public function CreateHook($name, $description, $enabled, $url, $translation, $headers, $method, $eventid): WebHook;

    /**
     * @permission administrator|user
     *
     * @param int $id
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
     * @return bool
     */
    public function EnableHook($id, $enabled): bool;

    /**
     * @permission webhook|administrator
     *
     * @return \app\domain\WebHook[]
     */
    public function GetAllHooks(): array;

    /**
     * @permission user|administrator
     *
     * @param int $id
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
     * @return \app\domain\WebHook[]
     */
    public function GetHooks($domain, $event): array;

    /**
     * @permission administrator|webhook
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\WebHook[]
     */
    public function ListHooks($page, $size, $columns, $order, $filters): array;

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
     * @return \app\domain\WebHook[]
     */
    public function ListUserHooks($userid, $page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator|user
     *
     * @param int             $id
     * @param string|string[] $privileges
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
     * @return bool
     */
    public function UpdateHook($id, $name, $description, $enabled, $url, $translation, $headers, $method, $eventid): bool;
}
