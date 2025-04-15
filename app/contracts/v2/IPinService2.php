<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:50 PM.
 */

namespace app\contracts\v2;

use app\domain\Key;
use vhs\services\IContract;

/** @typescript */
interface IPinService2 extends IContract {
    /**
     * @permission door
     *
     * @return void
     */
    public function AccessInstructions(): void;

    /**
     * Automatically generates a pin for a specified user.
     *
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return \app\domain\Key|null
     */
    public function GeneratePin($userid): Key|null;

    /**
     * @permission gen-temp-pin|administrator
     *
     * @param string $expires
     * @param string $privileges
     * @param string $notes
     *
     * @return \app\domain\Key
     */
    public function GenerateTemporaryPin($expires, $privileges, $notes): Key;

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return \app\domain\Key|null
     */
    public function GetUserPin($userid): Key|null;

    /**
     * @permission administrator|user
     *
     * @param int    $keyid
     * @param string $pin
     *
     * @return bool
     */
    public function UpdatePin($keyid, $pin): bool;

    /**
     * Change a pin.
     *
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $pin
     *
     * @return bool
     */
    public function UpdateUserPin($userid, $pin): bool;
}
