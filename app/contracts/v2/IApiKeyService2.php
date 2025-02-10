<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:55 PM.
 */

namespace app\contracts\v2;

use app\domain\Key;
use vhs\services\IContract;

/** @typescript */
interface IApiKeyService2 extends IContract {
    /**
     * @permission administrator|user
     *
     * @param int|int[] $keyid
     *
     * @throws string
     *
     * @return void
     */
    public function DeleteApiKey($keyid): void;

    /**
     * @permission administrator
     *
     * @param string $notes
     *
     * @throws string
     *
     * @return \app\domain\Key
     */
    public function GenerateSystemApiKey(string $notes): Key;

    /**
     * @permission administrator|user
     *
     * @param int|int[] $userid
     * @param string    $notes
     *
     * @throws string
     *
     * @return \app\domain\Key
     */
    public function GenerateUserApiKey($userid, $notes): Key;

    /**
     * @permission administrator|user
     *
     * @param int|int[] $keyid
     *
     * @throws string
     *
     * @return \app\domain\Key
     */
    public function GetApiKey($keyid): Key;

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\Key[]
     */
    public function GetSystemApiKeys(): array;

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @throws string
     *
     * @return \app\domain\Key[]
     */
    public function GetUserApiKeys($userid): array;

    /**
     * @permission administrator|user
     *
     * @param int|int[]       $keyid
     * @param string|string[] $privileges
     *
     * @throws string
     *
     * @return bool
     */
    public function PutApiKeyPrivileges($keyid, $privileges): bool;

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
    public function UpdateApiKey(int $keyid, string $notes, string $expires): bool;
}
