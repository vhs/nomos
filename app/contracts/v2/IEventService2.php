<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:44 AM.
 */

namespace app\contracts\v2;

use app\domain\Event;
use vhs\services\IContract;

/** @typescript */
interface IEventService2 extends IContract {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountEvents($filters): int;

    /**
     * @permission administrator
     *
     * @param string $name
     * @param string $domain
     * @param string $event
     * @param string $description
     * @param bool   $enabled
     *
     * @return \app\domain\Event
     */
    public function CreateEvent($name, $domain, $event, $description, $enabled): Event;

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return void
     */
    public function DeleteEvent($id): void;

    /**
     * @permission administrator
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return bool
     */
    public function EnableEvent($id, $enabled): bool;

    /**
     * @permission user
     *
     * @return \app\domain\Event[]
     */
    public function GetAccessibleEvents(): array;

    /**
     * @permission webhook|administrator
     *
     * @param string $domain
     *
     * @return void
     */
    public function GetDomainDefinition($domain): void;

    /**
     * @permission webhook|administrator
     *
     * @return mixed
     */
    public function GetDomainDefinitions(): mixed;

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return \app\domain\Event
     */
    public function GetEvent($id): Event;

    /**
     * @permission webhook|administrator
     *
     * @return \app\domain\Event[]
     */
    public function GetEvents(): array;

    /**
     * @permission administrator
     *
     * @return string[]
     */
    public function GetEventTypes(): array;

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
    public function ListEvents($page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator
     *
     * @param int             $id
     * @param string|string[] $privileges
     *
     * @return bool
     */
    public function PutEventPrivileges($id, $privileges): bool;

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
    public function UpdateEvent($id, $name, $domain, $event, $description, $enabled): bool;
}
