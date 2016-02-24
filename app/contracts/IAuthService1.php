<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:30 PM
 */

namespace app\contracts;


use vhs\services\IContract;

interface IAuthService1 extends IContract {

    /**
     * @permission anonymous
     * @return mixed
     */
    public function Logout();

    /**
     * @permission anonymous
     * @param $username
     * @param $password
     * @return mixed
     */
    public function Login($username, $password);

    /**
     * @permission administrator|pin-auth
     * @param $pin
     * @return mixed
     */
    public function CheckPin($pin);

    /**
     * @permission administrator|service-auth
     * @param $service
     * @param $id
     * @return mixed
     */
    public function CheckService($service, $id);

    /**
     * @permission administrator|rfid-auth
     * @param $rfid
     * @return mixed
     */
    public function CheckRfid($rfid);

    /**
     * @permission anonymous
     * @return mixed
     */
    public function CurrentUser();

    /**
     * @permission anonymous
     * @param $username
     * @return boolean
     */
    public function CheckUsername($username);

    /**
     * @permission administrator|user
     * @param $userid
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListUserAccessLog($userid, $page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListAccessLog($page, $size, $columns, $order, $filters);
}