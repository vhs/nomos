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
     * @param int|int[] $keyid
     *
     * @throws string
     *
     * @return void
     */
    public function DeleteApiKey($keyid): void {
        $key = Key::find($keyid);

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
     * @throws string
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
     * @param int|int[] $userid
     * @param string    $notes
     *
     * @throws string
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
     * @param int|int[] $keyid
     *
     * @throws string
     *
     * @return \app\domain\Key
     */
    public function GetApiKey($keyid): Key {
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
     * @throws string
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
     * @throws string
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
     * @param int|int[]       $keyid
     * @param string|string[] $privileges
     *
     * @throws string
     *
     * @return bool
     */
    public function PutApiKeyPrivileges($keyid, $privileges): bool {
        $keyid = Key::find($keyid);

        if (is_null($keyid)) {
            throw new InvalidInputException(\app\constants\Errors::E_INVALID_KEY_INPUT);
        }

        if (!CurrentUser::hasAnyPermissions('administrator')) {
            if (is_null($keyid->userid) || $keyid->userid != CurrentUser::getIdentity()) {
                throw new UnauthorizedException();
            }
        }

        $privArray = $privileges;

        if (!is_array($privArray)) {
            $privArray = explode(',', $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($keyid->privileges->all() as $priv) {
            $keyid->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            $keyid->privileges->add($priv);
        }

        return $keyid->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int    $keyid
     * @param string $notes
     * @param string $expires
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateApiKey(int $keyid, string $notes, string $expires): bool {
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
