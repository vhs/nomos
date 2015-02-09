<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:50 PM
 */

namespace app\contracts;


use vhs\services\IService;

interface IPinService1 extends IService {

    /**
     * @permission authenticated
     * @param $userid
     * @return mixed
     */
    public function GetUserPin($userid);

    /**
     * Automatically generates a pin for a specified user
     * @permission authenticated
     * @param $userid
     * @return mixed
     */
    public function GeneratePin($userid);

    /**
     * Change a pin
     * @permission authenticated
     * @param $pin
     * @return mixed
     */
    public function UpdateUserPin($userid, $pin);

    /**
     * @permission authenticated
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