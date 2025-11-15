<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 4:30 PM.
 */

namespace app\contracts\v2;

use app\domain\User;
use app\dto\TrimmedUser;
use app\security\UserPrincipal;
use app\utils\AuthCheckResult;
use vhs\security\AnonPrincipal;
use vhs\security\IPrincipal;
use vhs\services\IContract;

/** @typescript */
interface IAuthService2 extends IContract {
    /**
     * Check to see if the user pin and account is valid.
     *
     * @permission administrator|pin-auth
     *
     * @param string $pin
     *
     * @return \app\utils\AuthCheckResult
     */
    public function CheckPin($pin): AuthCheckResult;

    /**
     * @permission administrator|rfid-auth
     *
     * @param string $rfid
     *
     * @return \app\utils\AuthCheckResult
     */
    public function CheckRfid($rfid): AuthCheckResult;

    /**
     * Check to see if the user service/id is valid. A service could be github/slack/google.
     *
     * @permission administrator|service-auth
     *
     * @param string $service
     * @param string $id
     *
     * @return \app\utils\AuthCheckResult
     */
    public function CheckService($service, $id): AuthCheckResult;

    /**
     * @permission anonymous
     *
     * @param string $username
     *
     * @return bool
     */
    public function CheckUsername($username): bool;

    /**
     * @permission administrator
     *
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountAccessLog($filters): int;

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param \vhs\domain\Filter|null $filters
     *
     * @return int
     */
    public function CountUserAccessLog($userid, $filters): int;

    /**
     * @permission anonymous
     *
     * @return \app\security\UserPrincipal|\vhs\security\AnonPrincipal|\vhs\security\IPrincipal
     */
    public function CurrentUser(): IPrincipal|UserPrincipal|AnonPrincipal;

    /**
     * @permission oauth-provider
     *
     * @param string $username
     * @param string $password
     *
     * @return \app\dto\TrimmedUser|null
     */
    public function GetUser($username, $password): TrimmedUser|null;

    /**
     * @permission administrator
     *
     * @param int                            $page
     * @param int                            $size
     * @param string                         $columns
     * @param string                         $order
     * @param string|\vhs\domain\Filter|null $filters
     *
     * @return \app\domain\AccessLog[]
     */
    public function ListAccessLog($page, $size, $columns, $order, $filters): array;

    /**
     * @permission administrator|user
     *
     * @param int                     $userid
     * @param int                     $page
     * @param int                     $size
     * @param string                  $columns
     * @param string                  $order
     * @param \vhs\domain\Filter|null $filters
     *
     * @return \app\domain\AccessLog[]
     */
    public function ListUserAccessLog($userid, $page, $size, $columns, $order, $filters): array;

    /**
     * @permission anonymous
     *
     * @param string $username
     * @param string $password
     *
     * @return string
     */
    public function Login($username, $password): string;

    /**
     * @permission user
     *
     * @return void
     */
    public function Logout(): void;

    /**
     * @permission anonymous
     *
     * @param string $pin
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return string
     */
    public function PinLogin($pin): string;

    /**
     * @permission anonymous
     *
     * @param string $key
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return string
     */
    public function RfidLogin($key): string;
}
