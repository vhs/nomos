<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:30 PM.
 */

namespace app\contracts\v2;

use app\domain\AccessToken;
use app\domain\AppClient;
use app\domain\RefreshToken;
use app\domain\User;
use app\dto\TrimmedAppClient;
use app\dto\TrimmedUser;
use vhs\services\IContract;

/** @typescript */
interface IOAuthService2 extends IContract {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountClients($filters): int;

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountUserClients($userid, $filters): int;

    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @return void
     */
    public function DeleteClient($id): void;

    /**
     * @permission administrator|user
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return bool
     */
    public function EnableClient($id, $enabled): bool;

    /**
     * @permission oauth-provider
     *
     * @param string $bearerToken
     *
     * @return \app\domain\AccessToken
     */
    public function GetAccessToken($bearerToken): AccessToken;

    /**
     * @permission anonymous
     *
     * @param int    $clientId
     * @param string $clientSecret
     *
     * @return \app\dto\TrimmedAppClient|null
     */
    public function GetClient($clientId, $clientSecret): TrimmedAppClient|null;

    /**
     * GetClientDetails.
     *
     * @permission administrator|user
     *
     * @param int $id
     *
     * @return \app\domain\AppClient|null
     */
    public function GetClientDetails($id): AppClient|null;

    /**
     * @permission oauth-provider
     * @permission authenticated
     *
     * @param int $clientId
     *
     * @return \app\dto\TrimmedAppClient|null
     */
    public function GetClientInfo($clientId): TrimmedAppClient|null;

    /**
     * @permission oauth-provider
     *
     * @param string $refreshToken
     *
     * @return \app\domain\RefreshToken
     */
    public function GetRefreshToken($refreshToken): RefreshToken;

    /**
     * @permission administrator
     *
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\AppClient[]
     */
    public function ListClients($page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator|user
     *
     * @param int                            $userid
     * @param int                            $page
     * @param int                            $size
     * @param string                         $columns
     * @param string                         $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \app\domain\AppClient[]
     */
    public function ListUserClients($userid, $page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator|user
     *
     * @param string $name
     * @param string $description
     * @param string $url
     * @param string $redirecturi
     *
     * @return \app\domain\AppClient
     */
    public function RegisterClient($name, $description, $url, $redirecturi): AppClient;

    /**
     * @permission oauth-provider
     *
     * @param string $refreshToken
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return void
     */
    public function RevokeRefreshToken($refreshToken): void;

    /**
     * @permission oauth-provider
     *
     * @param int    $userId
     * @param string $accessToken
     * @param int    $clientId
     * @param string $expires
     *
     * @return \app\domain\User|false
     */
    public function SaveAccessToken($userId, $accessToken, $clientId, $expires): User|false;

    /**
     * @permission oauth-provider
     *
     * @param int    $userId
     * @param string $refreshToken
     * @param int    $clientId
     * @param string $expires
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\dto\TrimmedUser
     */
    public function SaveRefreshToken($userId, $refreshToken, $clientId, $expires): TrimmedUser;

    /**
     * @permission administrator|user
     *
     * @param int    $id
     * @param string $name
     * @param string $description
     * @param string $url
     * @param string $redirecturi
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return bool
     */
    public function UpdateClient($id, $name, $description, $url, $redirecturi): bool;

    /**
     * @permission administrator
     *
     * @param int    $id
     * @param string $expires
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return bool
     */
    public function UpdateClientExpiry($id, $expires): bool;
}
