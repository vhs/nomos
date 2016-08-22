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

    /**
     * @permission oauth-provider
     * @param $bearerToken
     * @return mixed
     */
    public function GetAccessToken($bearerToken);

    /**
     * @permission oauth-provider
     * @param $userId
     * @param $accessToken
     * @param $clientId
     * @param $expires
     * @return mixed
     */
    public function SaveAccessToken($userId, $accessToken, $clientId, $expires);

    /**
     * @permission oauth-provider
     * @param $username
     * @param $password
     * @return mixed
     */
    public function GetUser($username, $password);

    /**
     * @permission oauth-provider
     * @param $clientId
     * @param $clientSecret
     * @return mixed
     */
    public function GetClient($clientId, $clientSecret);

    /**
     * @permission user
     * @param $name
     * @param $description
     * @param $url
     * @param $redirecturi
     * @return mixed
     */
    public function RegisterClient($name, $description, $url, $redirecturi);

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
    public function ListUserClients($userid, $page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @return mixed
     */
    public function ListClients($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator|user
     * @param $id
     * @param $enabled
     * @return mixed
     */
    public function EnableClient($id, $enabled);

    /**
     * @permission administrator|user
     * @param $id
     * @return mixed
     */
    public function DeleteClient($id);

    /**
     * @permission oauth-provider
     * @param $refreshToken
     * @return mixed
     */
    public function GetRefreshToken($refreshToken);

    /**
     * @permission oauth-provider
     * @param $userId
     * @param $refreshToken
     * @param $clientId
     * @param $expires
     * @return mixed
     */
    public function SaveRefreshToken($userId, $refreshToken, $clientId, $expires);

    /**
     * @permission oauth-provider
     * @param $refreshToken
     * @return mixed
     */
    public function RevokeRefreshToken($refreshToken);
}