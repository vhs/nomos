<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/03/2015
 * Time: 6:32 PM.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IKeyService1 extends IContract {
    /**
     * @permission administrator|user
     *
     * @param int $keyid
     *
     * @return mixed
     */
    public function DeleteKey($keyid);

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param mixed  $type
     * @param mixed  $value
     * @param string $notes
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
     * @param int $keyid
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
     * @param int   $userid
     * @param mixed $types
     *
     * @return mixed
     */
    public function GetUserKeys($userid, $types);

    /**
     * @permission administrator|user
     *
     * @param int   $keyid
     * @param mixed $privileges
     *
     * @return mixed
     */
    public function PutKeyPrivileges($keyid, $privileges);

    /**
     * @permission administrator|user
     *
     * @param int    $keyid
     * @param string $notes
     * @param mixed  $expires
     *
     * @return mixed
     */
    public function UpdateKey($keyid, $notes, $expires);
}
