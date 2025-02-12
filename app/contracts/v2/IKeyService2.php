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
     * @param int $keyid
     *
     * @throws string
     *
     * @return void
     */
    public function DeleteKey($keyid): void;

    /**
     * @permission administrator|user
     *
     * @param int|int[] $userid
     * @param string    $type
     * @param string    $value
     * @param string    $notes
     *
     * @throws string
     *
     * @return \app\domain\Key|null
     */
    public function GenerateUserKey($userid, $type, $value, $notes): Key|null;

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\Key[]
     */
    public function GetAllKeys(): array;

    /**
     * @permission administrator|user
     *
     * @param int $keyid
     *
     * @throws string
     *
     * @return \app\domain\Key
     */
    public function GetKey($keyid): Key;

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\Key[]
     */
    public function GetSystemKeys(): array;

    /**
     * @permission administrator|user
     *
     * @param int|int[] $userid
     * @param string[]  $types
     *
     * @throws string
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
     * @throws string
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
     * @throws string
     *
     * @return bool
     */
    public function UpdateKey($keyid, $notes, $expires): bool;
}
