<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:44 AM.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IEventService1 extends IContract {
    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountEvents($filters);

    /**
     * @permission administrator
     *
     * @param string $name
     * @param string $domain
     * @param mixed  $event
     * @param string $description
     * @param bool   $enabled
     *
     * @return mixed
     */
    public function CreateEvent($name, $domain, $event, $description, $enabled);

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return mixed
     */
    public function DeleteEvent($id);

    /**
     * @permission administrator
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return mixed
     */
    public function EnableEvent($id, $enabled);

    /**
     * @permission user
     *
     * @return mixed
     */
    public function GetAccessibleEvents();

    /**
     * @permission webhook|administrator
     *
     * @param string $domain
     *
     * @return mixed
     */
    public function GetDomainDefinition($domain);

    /**
     * @permission webhook|administrator
     *
     * @return mixed
     */
    public function GetDomainDefinitions();

    /**
     * @permission administrator
     *
     * @param int $id
     *
     * @return mixed
     */
    public function GetEvent($id);

    /**
     * @permission webhook|administrator
     *
     * @return mixed
     */
    public function GetEvents();

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetEventTypes();

    /**
     * @permission webhook|administrator
     *
     * @param int                            $page
     * @param int                            $size
     * @param mixed                          $columns
     * @param mixed                          $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return mixed
     */
    public function ListEvents($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param int   $id
     * @param mixed $privileges
     *
     * @return mixed
     */
    public function PutEventPrivileges($id, $privileges);

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $name
     * @param string $domain
     * @param mixed  $event
     * @param string $description
     * @param bool   $enabled
     *
     * @return mixed
     */
    public function UpdateEvent($id, $name, $domain, $event, $description, $enabled);
}
