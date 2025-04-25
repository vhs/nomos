<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:30 PM.
 */

namespace app\handlers\v2;

use app\contracts\v2\IOAuthService2;
use app\domain\AccessToken;
use app\domain\AppClient;
use app\domain\RefreshToken;
use app\domain\User;
use app\dto\TrimmedAppClient;
use app\dto\TrimmedUser;
use DateTime;
use vhs\domain\Domain;
use vhs\domain\Filter;
use vhs\exceptions\HttpException;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class OAuthServiceHandler2 extends Service implements IOAuthService2 {
    /**
     * @permission administrator
     *
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountClients($filters): int {
        return AppClient::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountUserClients($userid, $filters): int {
        $filters = $this->addUserIDToFilters($userid, $filters);

        return AppClient::count($filters);
    }

    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @return void
     */
    public function DeleteClient($id): void {
        $client = $this->getOAuthClient($id);

        $client->delete();
    }

    /**
     * @permission administrator|user
     *
     * @param int  $id
     * @param bool $enabled
     *
     * @return bool
     */
    public function EnableClient($id, $enabled): bool {
        $client = $this->getOAuthClient($id);

        $client->enabled = $enabled;

        return $client->save();
    }

    /**
     * @permission oauth-provider
     *
     * @param string $bearerToken
     *
     * @return \app\domain\AccessToken
     */
    public function GetAccessToken($bearerToken): AccessToken {
        return AccessToken::findByToken($bearerToken);
    }

    /**
     * @permission anonymous
     *
     * @param int    $clientId
     * @param string $clientSecret
     *
     * @return \app\dto\TrimmedAppClient|null
     */
    public function GetClient($clientId, $clientSecret): TrimmedAppClient|null {
        $client = AppClient::find($clientId);

        if (!is_null($client) && $client->secret == $clientSecret) {
            return $this->trimClient($client);
        }

        return null;
    }

    /**
     * GetClientDetails.
     *
     * @permission administrator|user
     *
     * @param int $id
     *
     * @return \app\domain\AppClient
     */
    public function GetClientDetails($id): AppClient {
        return $this->getOAuthClient($id);
    }

    /**
     * @permission oauth-provider
     * @permission authenticated
     *
     * @param int $clientId
     *
     * @return \app\dto\TrimmedAppClient|null
     */
    public function GetClientInfo($clientId): TrimmedAppClient|null {
        $client = AppClient::find($clientId);

        if (!is_null($client)) {
            return $this->trimClientInfo($client);
        }

        return null;
    }

    /**
     * @permission oauth-provider
     *
     * @param string $refreshToken
     *
     * @return \app\domain\RefreshToken
     */
    public function GetRefreshToken($refreshToken): RefreshToken {
        return RefreshToken::findByToken($refreshToken);
    }

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
    public function ListClients($page, $size, $columns, $order, $filters): array {
        return AppClient::page($page, $size, $columns, $order, $filters);
    }

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
    public function ListUserClients($userid, $page, $size, $columns, $order, $filters): array {
        $userService2 = new UserServiceHandler2();
        $user = $userService2->GetUser($userid);

        AppClient::coerceFilters($filters);

        if (is_null($user)) {
            throw new UnauthorizedException('User not found or you do not have access');
        }

        $userFilter = Filter::Equal('userid', $user->id);

        if (is_null($filters) || $filters == '') {
            $filters = $userFilter;
        } else {
            $filters = Filter::_And($userFilter, $filters);
        }

        $cols = explode(',', $columns);

        array_push($cols, 'userid');

        $columns = implode(',', array_unique($cols));

        return AppClient::page($page, $size, $columns, $order, $filters);
    }

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
    public function RegisterClient($name, $description, $url, $redirecturi): AppClient {
        $client = new AppClient();

        $client->name = $name;
        $client->description = $description;
        $client->url = $url;
        $client->redirecturi = $redirecturi;
        $client->secret = bin2hex(openssl_random_pseudo_bytes(32));
        $client->owner = User::find(CurrentUser::getIdentity());
        $client->expires = date('Y-m-d', strtotime('+1 year'));

        if (!$client->save()) {
            throw new HttpException('Failed to save new client!', HttpStatusCodes::Server_Error_Internal_Service_Error);
        }

        return $client;
    }

    /**
     * @permission oauth-provider
     *
     * @param string $refreshToken
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return void
     */
    public function RevokeRefreshToken($refreshToken): void {
        $token = RefreshToken::findByToken($refreshToken);

        if (is_null($token)) {
            throw new HttpException('RefreshToken token not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        $token->delete();
    }

    /**
     * @permission oauth-provider
     *
     * @param int    $userId
     * @param string $accessToken
     * @param int    $clientId
     * @param string $expires
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\domain\User|false
     */
    public function SaveAccessToken($userId, $accessToken, $clientId, $expires): User|false {
        $user = User::find($userId);

        if (is_null($user)) {
            throw new HttpException('User not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        $token = new AccessToken();

        $token->token = $accessToken;
        $token->user = $user;

        $client = AppClient::find($clientId);

        if (!is_null($client)) {
            $token->client = $client;
        }

        $expiry = new DateTime($expires);

        $token->expires = $expiry->format('Y-m-d H:i:s');

        $token->save();

        return $user;
    }

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
    public function SaveRefreshToken($userId, $refreshToken, $clientId, $expires): TrimmedUser {
        $user = User::find($userId);
        $client = AppClient::find($clientId);

        if (is_null($user)) {
            throw new HttpException('User not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        $token = new RefreshToken();

        $token->token = $refreshToken;
        $token->user = $user;

        if (!is_null($client)) {
            $token->client = $client;
        }

        $expiry = new DateTime($expires);

        $token->expires = $expiry->format('Y-m-d H:i:s');

        $token->save();

        return $this->trimUser($user);
    }

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
    public function UpdateClient($id, $name, $description, $url, $redirecturi): bool {
        $client = $this->getOAuthClient($id);

        $client->name = $name;
        $client->description = $description;
        $client->url = $url;
        $client->redirecturi = $redirecturi;

        return $client->save();
    }

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
    public function UpdateClientExpiry($id, $expires): bool {
        $client = AppClient::find($id);

        if (is_null($client)) {
            throw new HttpException('Client not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        $client->expires = $expires;

        return $client->save();
    }

    /**
     * Summary of AddUserIDToFilters.
     *
     * @param mixed                          $userid
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \vhs\domain\Filter
     */
    private function addUserIDToFilters($userid, $filters): Filter {
        $userService2 = new UserServiceHandler2();
        $user = $userService2->GetUser($userid);

        Domain::coerceFilters($filters);

        if (is_null($user)) {
            throw new UnauthorizedException('User not found or you do not have access');
        }

        $userFilter = Filter::Equal('userid', $user->id);

        if (is_null($filters) || $filters == '') {
            $filters = $userFilter;
        } else {
            $filters = Filter::_And($userFilter, $filters);
        }

        return $filters;
    }

    /**
     * getOAuthClient.
     *
     * @param int $id
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\domain\AppClient
     */
    private function getOAuthClient($id): AppClient {
        $client = AppClient::find($id);

        if (is_null($client)) {
            throw new HttpException('Client not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        if (CurrentUser::getIdentity() != $client->userid && !CurrentUser::hasAnyPermissions('administrator')) {
            throw new HttpException('Client is not accessible', HttpStatusCodes::Client_Error_Forbidden);
        }

        return $client;
    }

    /**
     * Summary of trimClient.
     *
     * @param \app\domain\AppClient $client
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\dto\TrimmedAppClient
     */
    private function trimClient($client): TrimmedAppClient {
        if (is_null($client)) {
            throw new HttpException('Client not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        return new TrimmedAppClient($client);
    }

    /**
     * Summary of trimClientInfo.
     *
     * @param \app\domain\AppClient|null $client
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\dto\TrimmedAppClient
     */
    private function trimClientInfo($client): TrimmedAppClient {
        if (is_null($client)) {
            throw new HttpException('Client not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        return new TrimmedAppClient($client);
    }

    /**
     * Summary of trimUser.
     *
     * @param \app\domain\User|null $user
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return \app\dto\TrimmedUser
     */
    private function trimUser($user): TrimmedUser {
        if (is_null($user)) {
            throw new HttpException('Client not found', HttpStatusCodes::Client_Error_Not_Found);
        }

        return new TrimmedUser($user);
    }
}
