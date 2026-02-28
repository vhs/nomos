<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:50 PM.
 */

namespace app\contracts;

use vhs\services\IContract;

/** @typescript */
interface IPinService1 extends IContract {
    /**
     * @permission door
     *
     * @return mixed
     */
    public function AccessInstructions();

    /**
     * Automatically generates a pin for a specified user.
     *
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return mixed
     */
    public function GeneratePin($userid);

    /**
     * @permission gen-temp-pin|administrator
     *
     * @param mixed  $expires
     * @param mixed  $privileges
     * @param string $notes
     *
     * @return mixed
     */
    public function GenerateTemporaryPin($expires, $privileges, $notes);

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return mixed
     */
    public function GetUserPin($userid);

    /**
     * @permission administrator|user
     *
     * @param int   $keyid
     * @param mixed $pin
     *
     * @return mixed
     */
    public function UpdatePin($keyid, $pin);

    /**
     * Change a pin.
     *
     * @permission administrator|user
     *
     * @param int   $userid
     * @param mixed $pin
     *
     * @return mixed
     */
    public function UpdateUserPin($userid, $pin);
}
