<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:44 AM
 */

namespace app\contracts;


use vhs\services\IContract;

interface IEventService1 extends IContract
{

    /**
     * @permission webhook|administrator
     * @return mixed
     */
    function GetEvents();

    /**
     * @permission webhook|administrator
     * @return mixed
     */
    function GetDomainDefinitions();

    /**
     * @permission webhook|administrator
     * @param $domain
     * @return mixed
     */
    function GetDomainDefinition($domain);

    /**
     * @permission user
     * @return mixed
     */
    function GetAccessibleEvents();

    /**
     * @permission administrator
     * @param $id
     * @return mixed
     */
    function GetEvent($id);

    /**
     * @permission administrator
     * @param $name
     * @param $domain
     * @param $event
     * @param $description
     * @param $enabled
     * @return mixed
     */
    function CreateEvent($name, $domain, $event, $description, $enabled);

    /**
     * @permission administrator
     * @param $id
     * @param $enabled
     * @return mixed
     */
    function EnableEvent($id, $enabled);

    /**
     * @permission administrator
     * @param $id
     * @param $privileges
     * @return mixed
     */
    function PutEventPrivileges($id, $privileges);

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
    function UpdateEvent($id, $name, $domain, $event, $description, $enabled);

    /**
     * @permission administrator
     * @param $id
     * @return mixed
     */
    function DeleteEvent($id);

    /**
     * @permission webhook|administrator
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListEvents($page, $size, $columns, $order, $filters);

    /**
     * @permission webhook|administrator
     * @param $filters
     * @return mixed
     */
    public function CountEvents($filters);

}
