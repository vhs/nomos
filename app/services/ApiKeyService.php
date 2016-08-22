<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 08/02/2015
 * Time: 1:50 PM
 */

namespace app\services;


use app\contracts\IApiKeyService1;
use app\domain\Key;
use app\domain\Privilege;
use app\domain\User;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

class ApiKeyService extends Service implements IApiKeyService1 {
    public function GetSystemApiKeys() {
        return Key::getSystemApiKeys();
    }

    public function GetUserApiKeys($userid) {
        if(!CurrentUser::hasAnyPermissions("administrator") && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        return Key::getUserApiKeys($userid);
    }

    public function GenerateSystemApiKey($notes) {
        $apiKey = new Key();
        $apiKey->key = bin2hex(openssl_random_pseudo_bytes(32));
        $apiKey->type = "api";
        $apiKey->notes = $notes;
        $apiKey->save();

        return $apiKey;
    }

    public function GetApiKey($keyid) {
        $key = Key::find($keyid);

        if(is_null($key)) throw new \Exception("Invalid keyid");

        if(!CurrentUser::hasAnyPermissions("administrator")) {
            if (is_null($key->userid) || $key->userid != CurrentUser::getIdentity())
                throw new UnauthorizedException();
        }

        return $key;
    }

    public function GenerateUserApiKey($userid, $notes) {
        if(!CurrentUser::hasAnyPermissions("administrator") && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $user = User::find($userid);

        if(is_null($user))
            throw new \Exception("Invalid userid");

        $apiKey = new Key();
        $apiKey->key = bin2hex(openssl_random_pseudo_bytes(32));
        $apiKey->type = "api";
        $apiKey->notes = $notes;

        $user->keys->add($apiKey);
        $user->save();

        return $apiKey;
    }

    public function UpdateApiKey($keyid, $notes, $expires) {
        $key = $this->GetApiKey($keyid);

        $key->notes = $notes;
        $key->expires = $expires;
        $key->save();
    }

    public function PutApiKeyPrivileges($keyid, $privileges) {
        $key = $this->GetApiKey($keyid);

        $privArray = $privileges;

        if(!is_array($privArray)) {
            $privArray = explode(",", $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        foreach($key->privileges->all() as $priv)
            $key->privileges->remove($priv);

        foreach($privs as $priv)
            $key->privileges->add($priv);

        $key->save();
    }

    public function DeleteApiKey($keyid) {
        $key = Key::find($keyid);

        if(!CurrentUser::hasAnyPermissions("administrator") && $key->userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $key->delete();
    }
}