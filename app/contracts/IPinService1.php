<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:50 PM
 */

namespace app\contracts;

use vhs\services\IContract;

interface IPinService1 extends IContract {
    /**
     * @permission administrator|user
     * @param $userid
     * @return mixed
     */
    public function GetUserPin($userid);

    /**
     * Automatically generates a pin for a specified user
     * @permission administrator|user
     * @param $userid
     * @return mixed
     */
    public function GeneratePin($userid);

    /**
     * @permission gen-temp-pin|administrator
     * @param $expires
     * @param $privileges
     * @param $notes
     * @return mixed
     */
    public function GenerateTemporaryPin($expires, $privileges, $notes);

    /**
     * Change a pin
     * @permission administrator|user
     * @param $pin
     * @return mixed
     */
    public function UpdateUserPin($userid, $pin);

    /**
     * @permission administrator|user
     * @param $keyid
     * @param $pin
     * @return mixed
     */
    public function UpdatePin($keyid, $pin);

    /**
     * @permission door
     * @return mixed
     */
    public function AccessInstructions();
}
