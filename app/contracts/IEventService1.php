<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:44 AM.
 */

namespace app\contracts;

use vhs\services\IContract;

interface IEventService1 extends IContract {
    /**
     * @permission administrator
     *
     * @param $filters
     *
     * @return int
     */
    public function CountEvents($filters);

    /**
     * @permission administrator
     *
     * @param $name
     * @param $domain
     * @param $event
     * @param $description
     * @param $enabled
     *
     * @return mixed
     */
    public function CreateEvent($name, $domain, $event, $description, $enabled);

    /**
     * @permission administrator
     *
     * @param $id
     *
     * @return mixed
     */
    public function DeleteEvent($id);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $enabled
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
     * @param $domain
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
     * @param $id
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
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     *
     * @return mixed
     */
    public function ListEvents($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $privileges
     *
     * @return mixed
     */
    public function PutEventPrivileges($id, $privileges);

    /**
     * @permission administrator
     *
     * @param $id
     * @param $name
     * @param $domain
     * @param $event
     * @param $description
     * @param $enabled
     *
     * @return mixed
     */
    public function UpdateEvent($id, $name, $domain, $event, $description, $enabled);
}
