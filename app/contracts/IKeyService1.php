<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/03/2015
 * Time: 6:32 PM.
 */

namespace app\contracts;

use vhs\services\IContract;

interface IKeyService1 extends IContract {
    /**
     * @permission administrator|user
     *
     * @param $keyid
     *
     * @return mixed
     */
    public function DeleteKey($keyid);

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $type
     * @param $value
     * @param $notes
     *
     * @return mixed
     */
    public function GenerateUserKey($userid, $type, $value, $notes);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetAllKeys();

    /**
     * @permission administrator|user
     *
     * @param $keyid
     *
     * @return mixed
     */
    public function GetKey($keyid);

    /**
     * @permission administrator
     *
     * @return mixed
     */
    public function GetSystemKeys();

    /**
     * @permission administrator|user
     *
     * @param $userid
     * @param $types
     *
     * @return mixed
     */
    public function GetUserKeys($userid, $types);

    /**
     * @permission administrator|user
     *
     * @param $keyid
     * @param $privileges
     *
     * @return mixed
     */
    public function PutKeyPrivileges($keyid, $privileges);

    /**
     * @permission administrator|user
     *
     * @param $keyid
     * @param $notes
     * @param $expires
     *
     * @return mixed
     */
    public function UpdateKey($keyid, $notes, $expires);
}
