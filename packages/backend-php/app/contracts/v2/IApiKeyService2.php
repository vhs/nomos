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
     * @param int $id
     *
     * @return void
     */
    public function DeleteApiKey($id): void;

    /**
     * @permission administrator
     *
     * @param string $notes
     *
     * @return \app\domain\Key
     */
    public function GenerateSystemApiKey(string $notes): Key;

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $notes
     *
     * @return \app\domain\Key
     */
    public function GenerateUserApiKey($userid, $notes): Key;

    /**
     * @permission administrator|user
     *
     * @param int $keyid
     *
     * @return \app\domain\Key
     */
    public function GetApiKey($keyid): Key;

    /**
     * @permission administrator
     *
     * @return \app\domain\Key[]
     */
    public function GetSystemApiKeys(): array;

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return \app\domain\Key[]
     */
    public function GetUserApiKeys($userid): array;

    /**
     * @permission administrator|user
     *
     * @param int             $keyid
     * @param string|string[] $privileges
     *
     * @return bool
     */
    public function PutApiKeyPrivileges($keyid, $privileges): bool;

    /**
     * @permission administrator|user
     *
     * @param int         $keyid
     * @param string      $notes
     * @param string|null $expires
     *
     * @return bool
     */
    public function UpdateApiKey(int $keyid, string $notes, string|null $expires): bool;
}
