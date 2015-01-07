<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:30 PM
 */

namespace app\contracts;


use vhs\services\IService;

interface IAuthService1 extends IService {

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
     * @permission anonymous
     * @param $pin
     * @return mixed
     */
    public function PinLogin($pin);

    /**
     * @permission anonymous
     * @param $key
     * @return mixed
     */
    public function RfidLogin($key);

    /**
     * @permission anonymous
     * @return mixed
     */
    public function CurrentUser();
}