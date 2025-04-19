<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:30 PM.
 */

namespace app\contracts;

use app\domain\AppClient;
use vhs\services\IContract;

/** @typescript */
interface IAuthService1 extends IContract {
    /**
     * @permission administrator|pin-auth
     *
     * @param string $pin
     *
     * @return mixed
     */
    public function CheckPin($pin);

    /**
     * @permission administrator|rfid-auth
     *
     * @param string $rfid
     *
     * @return mixed
     */
    public function CheckRfid($rfid);

    /**
     * @permission administrator|service-auth
     *
     * @param string $service
     * @param string $id
     *
     * @return mixed
     */
    public function CheckService($service, $id);

    /**
     * @permission anonymous
     *
     * @param string $username
     *
     * @return bool
     */
    public function CheckUsername($username);

    /**
     * @permission administrator
     *
     * @param string $filters
     *
     * @return mixed
     */
    public function CountAccessLog($filters);

    /**
     * @permission administrator
     *
     * @param string $filters
     *
     * @return mixed
     */
    public function CountClients($filters);

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $filters
     *
     * @return mixed
     */
    public function CountUserAccessLog($userid, $filters);

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $filters
     *
     * @return mixed
     */
    public function CountUserClients($userid, $filters);

    /**
     * @permission anonymous
     *
     * @return mixed
     */
    public function CurrentUser();

    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @return mixed
     */
    public function DeleteClient($id);

    /**
     * @permission administrator|user
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return mixed
     */
    public function EnableClient($id, $enabled);

    /**
     * @permission oauth-provider
     *
     * @param string $bearerToken
     *
     * @return mixed
     */
    public function GetAccessToken($bearerToken);

    /**
     * @permission oauth-provider
     *
     * @param int    $clientId
     * @param string $clientSecret
     *
     * @return mixed
     */
    public function GetClient($clientId, $clientSecret);

    /**
     * @permission oauth-provider
     *
     * @param int $clientId
     *
     * @return mixed
     */
    public function GetClientInfo($clientId);

    /**
     * @permission oauth-provider
     *
     * @param string $refreshToken
     *
     * @return mixed
     */
    public function GetRefreshToken($refreshToken);

    /**
     * @permission oauth-provider
     *
     * @param string $username
     * @param string $password
     *
     * @return mixed
     */
    public function GetUser($username, $password);

    /**
     * @permission administrator
     *
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @return mixed
     */
    public function ListAccessLog($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator
     *
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @return mixed
     */
    public function ListClients($page, $size, $columns, $order, $filters);

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param int    $page
     * @param int    $size
     * @param string $columns
     * @param string $order
     * @param string $filters
     *
     * @return mixed
     */
    public function ListUserAccessLog($userid, $page, $size, $columns, $order, $filters);

    /**
     * @permission administrator|user
     *
     * @param int                            $userid
     * @param int                            $page
     * @param int                            $size
     * @param mixed                          $columns
     * @param mixed                          $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return AppClient[]
     */
    public function ListUserClients($userid, $page, $size, $columns, $order, $filters);

    /**
     * @permission anonymous
     *
     * @param string $username
     * @param string $password
     *
     * @return mixed
     */
    public function Login($username, $password);

    /**
     * @permission anonymous
     *
     * @return mixed
     */
    public function Logout();

    /**
     * @permission administrator|user
     *
     * @param string $name
     * @param string $description
     * @param string $url
     * @param string $redirecturi
     *
     * @return mixed
     */
    public function RegisterClient($name, $description, $url, $redirecturi);

    /**
     * @permission oauth-provider
     *
     * @param string $refreshToken
     *
     * @return mixed
     */
    public function RevokeRefreshToken($refreshToken);

    /**
     * @permission oauth-provider
     *
     * @param int    $userId
     * @param string $accessToken
     * @param int    $clientId
     * @param string $expires
     *
     * @return mixed
     */
    public function SaveAccessToken($userId, $accessToken, $clientId, $expires);

    /**
     * @permission oauth-provider
     *
     * @param int    $userId
     * @param string $refreshToken
     * @param int    $clientId
     * @param string $expires
     *
     * @return mixed
     */
    public function SaveRefreshToken($userId, $refreshToken, $clientId, $expires);
}
