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
     * @permission administrator
     * @param $userid
     * @return mixed
     */
    public function GetUserPins($userid);

    /**
     * @permission administrator
     * @return mixed
     */
    public function GetSystemPins();

    /**
     * Creates a pin for a specified user
     * @permission administrator|user
     * @param $userid
     * @param $pin
     * @param $notes
     * @return mixed
     */
    public function CreatePin($userid, $pin, $notes);

    /**
     * @permission administrator
     * @param $pin
     * @param $notes
     * @return mixed
     */
    public function CreateSystemPin($pin, $notes);

    /**
     * Change a pin
     * @permission administrator|user
     * @param $pin
     * @return mixed
     */
    public function UpdatePin($pinid, $pin);

    /**
     * @permission administrator|user
     * @param $pinid
     * @param $pin
     * @return mixed
     */
    public function PutPinPriviledges($pinid, $pin);

    /**
     * Deletes a specified auth key
     * @permission administrator|user
     * @param $id
     * @return mixed
     */
    public function DeletePin($id);
}