<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:55 PM.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IApiKeyService1 extends IContract {
    /**
     * @permission administrator|user
     *
     * @param int $keyid
     *
     * @return mixed
     */
    public function DeleteApiKey($keyid);

    /**
     * @permission administrator
     *
     * @param string $notes
     *
     * @return mixed
     */
    public function GenerateSystemApiKey($notes);

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $notes
     *
     * @return mixed
     */
    public function GenerateUserApiKey($userid, $notes);

    /**
     * @permission administrator|user
     *
     * @param int $keyid
     *
     * @return mixed
     */
    public function GetApiKey($keyid);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetSystemApiKeys();

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return mixed
     */
    public function GetUserApiKeys($userid);

    /**
     * @permission administrator|user
     *
     * @param int    $keyid
     * @param string $privileges
     *
     * @return mixed
     */
    public function PutApiKeyPrivileges($keyid, $privileges);

    /**
     * @permission administrator|user
     *
     * @param int    $keyid
     * @param string $notes
     * @param string $expires
     *
     * @return mixed
     */
    public function UpdateApiKey($keyid, $notes, $expires);
}
