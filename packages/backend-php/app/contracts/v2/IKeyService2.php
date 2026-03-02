<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/03/2015
 * Time: 6:32 PM.
 */

namespace app\contracts\v2;

use app\domain\Key;
use vhs\services\IContract;

/** @typescript */
interface IKeyService2 extends IContract {
    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @return void
     */
    public function DeleteKey($id): void;

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $type
     * @param string $value
     * @param string $notes
     *
     * @return \app\domain\Key|null
     */
    public function GenerateUserKey($userid, $type, $value, $notes): Key|null;

    /**
     * @permission administrator
     *
     * @return \app\domain\Key[]
     */
    public function GetAllKeys(): array;

    /**
     * @permission administrator|user
     *
     * @param int $keyid
     *
     * @return \app\domain\Key
     */
    public function GetKey($keyid): Key;

    /**
     * @permission administrator
     *
     * @return \app\domain\Key[]
     */
    public function GetSystemKeys(): array;

    /**
     * @permission administrator|user
     *
     * @param int      $userid
     * @param string[] $types
     *
     * @return \app\domain\Key[]
     */
    public function GetUserKeys($userid, $types): array;

    /**
     * @permission administrator|user
     *
     * @param int             $keyid
     * @param string|string[] $privileges
     *
     * @return bool
     */
    public function PutKeyPrivileges($keyid, $privileges): bool;

    /**
     * @permission administrator|user
     *
     * @param int    $keyid
     * @param string $notes
     * @param string $expires
     *
     * @return bool
     */
    public function UpdateKey($keyid, $notes, $expires): bool;
}
