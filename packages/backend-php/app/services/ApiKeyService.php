<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 08/02/2015
 * Time: 1:50 PM.
 */

namespace app\services;

use app\contracts\IApiKeyService1;
use app\domain\Key;
use app\domain\Privilege;
use app\domain\User;
use app\exceptions\InvalidInputException;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

class ApiKeyService extends Service implements IApiKeyService1 {
    /**
     * @permission administrator|user
     *
     * @param int $keyid
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return void
     */
    public function DeleteApiKey($keyid) {
        /** @var \app\domain\Key */
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
     * @return mixed
     */
    public function GenerateSystemApiKey($notes) {
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
     * @return mixed
     */
    public function GenerateUserApiKey($userid, $notes) {
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
    public function GetApiKey($keyid) {
        /** @var \app\domain\Key */
        $key = Key::find($keyid);

        if (is_null($key)) {
            throw new InvalidInputException('Invalid keyid');
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
     * @return mixed
     */
    public function GetSystemApiKeys() {
        return Key::getSystemApiKeys();
    }

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return mixed
     */
    public function GetUserApiKeys($userid) {
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
     * @return void
     */
    public function PutApiKeyPrivileges($keyid, $privileges) {
        $key = $this->GetApiKey($keyid);

        $privArray = is_string($privileges) ? explode(',', $privileges) : $privileges;

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($key->privileges->all() as $priv) {
            $key->privileges->remove($priv);
        }

        if (!is_null($privs)) {
            foreach ($privs as $priv) {
                $key->privileges->add($priv);
            }
        }

        $key->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int    $keyid
     * @param string $notes
     * @param string $expires
     *
     * @return void
     */
    public function UpdateApiKey($keyid, $notes, $expires) {
        $key = $this->GetApiKey($keyid);

        $key->notes = $notes;
        $key->expires = $expires;
        $key->save();
    }
}
