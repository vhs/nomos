<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:55 PM
 */

namespace app\contracts;


use vhs\services\IService;

interface IApiKeyService1 extends IService {

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetApiKeys();

    /**
     * @permission administrator|user
     * @param $userid
     * @return mixed
     */
    public function GetUserApiKeys($userid);

    /**
     * @permission administrator
     * @param $key
     * @param $notes
     * @return mixed
     */
    public function CreateSystemApiKey($key, $notes);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $key
     * @param $notes
     * @return mixed
     */
    public function CreateUserApiKey($userid, $key, $notes);

    /**
     * @permission administrator|user
     * @param $keyid
     * @param $priviledges
     * @return mixed
     */
    public function PutApiKeyPriviledges($keyid, $priviledges);

    /**
     * @permission administrator|user
     * @param $keyid
     * @return mixed
     */
    public function DeleteApiKey($keyid);
}