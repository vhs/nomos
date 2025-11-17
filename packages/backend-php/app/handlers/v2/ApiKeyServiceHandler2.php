<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 08/02/2015
 * Time: 1:50 PM.
 */

namespace app\handlers\v2;

use app\contracts\v2\IApiKeyService2;
use app\domain\Key;
use app\domain\Privilege;
use app\domain\User;
use app\exceptions\InvalidInputException;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

/** @typescript */
class ApiKeyServiceHandler2 extends Service implements IApiKeyService2 {
    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return void
     */
    public function DeleteApiKey($id): void {
        /** @var \app\domain\Key */
        $key = Key::find($id);

        if (!CurrentUser::hasAnyPermissions('administrator') && $key->userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $key->delete();
    }

    /**
     * @permission administrator
     *
     * @param string $notes
     *
     * @return \app\domain\Key
     */
    public function GenerateSystemApiKey($notes): Key {
        $apiKey = new Key();

        $apiKey->key = bin2hex(openssl_random_pseudo_bytes(32));
        $apiKey->type = 'api';
        $apiKey->notes = $notes;

        $apiKey->save();

        return $apiKey;
    }

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $notes
     *
     * @throws \app\exceptions\InvalidInputException
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \app\domain\Key
     */
    public function GenerateUserApiKey($userid, $notes): Key {
        if (!CurrentUser::hasAnyPermissions('administrator') && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $user = User::find($userid);

        if (is_null($user)) {
            throw new InvalidInputException('Invalid userid');
        }

        $apiKey = new Key();

        $apiKey->key = bin2hex(openssl_random_pseudo_bytes(32));
        $apiKey->type = 'api';
        $apiKey->notes = $notes;

        $user->keys->add($apiKey);

        $user->save();

        return $apiKey;
    }

    /**
     * @permission administrator|user
     *
     * @param int $keyid
     *
     * @throws \app\exceptions\InvalidInputException
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \app\domain\Key
     */
    public function GetApiKey($keyid): Key {
        /** @var \app\domain\Key|null $key */
        $key = Key::find($keyid);

        if (is_null($key)) {
            throw new InvalidInputException(\app\constants\Errors::E_INVALID_KEY_INPUT);
        }

        if (!CurrentUser::hasAnyPermissions('administrator')) {
            if (is_null($key->userid) || $key->userid != CurrentUser::getIdentity()) {
                throw new UnauthorizedException();
            }
        }

        return $key;
    }

    /**
     * @permission administrator
     *
     * @return \app\domain\Key[]
     */
    public function GetSystemApiKeys(): array {
        return Key::getSystemApiKeys();
    }

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \app\domain\Key[]
     */
    public function GetUserApiKeys($userid): array {
        if (!CurrentUser::hasAnyPermissions('administrator') && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        return Key::getUserApiKeys($userid);
    }

    /**
     * @permission administrator|user
     *
     * @param int             $keyid
     * @param string|string[] $privileges
     *
     * @throws \app\exceptions\InvalidInputException
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return bool
     */
    public function PutApiKeyPrivileges($keyid, $privileges): bool {
        /** @var \app\domain\Key|null */
        $key = Key::find($keyid);

        if (is_null($key)) {
            throw new InvalidInputException(\app\constants\Errors::E_INVALID_KEY_INPUT);
        }

        if (!CurrentUser::hasAnyPermissions('administrator')) {
            if (is_null($key->userid) || $key->userid != CurrentUser::getIdentity()) {
                throw new UnauthorizedException();
            }
        }

        $privArray = is_string($privileges) ? explode(',', $privileges) : $privileges;

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($key->privileges->all() as $priv) {
            $key->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            $key->privileges->add($priv);
        }

        return $key->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int         $keyid
     * @param string      $notes
     * @param string|null $expires
     *
     * @throws \app\exceptions\InvalidInputException
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return bool
     */
    public function UpdateApiKey($keyid, $notes, $expires): bool {
        /** @var \app\domain\Key */
        $key = Key::find($keyid);

        if (is_null($key)) {
            throw new InvalidInputException(\app\constants\Errors::E_INVALID_KEY_INPUT);
        }

        if (!CurrentUser::hasAnyPermissions('administrator') && (is_null($key->userid) || $key->userid != CurrentUser::getIdentity())) {
            throw new UnauthorizedException();
        }

        $key->notes = $notes;
        $key->expires = $expires;

        return $key->save();
    }
}
