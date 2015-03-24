<?php

use app\security\Authenticate;
use vhs\security\CurrentUser;
use app\domain\Key;

class OauthHelper {

    public function __construct(\League\OAuth2\Client\Provider\AbstractProvider $provider){
        $this->provider = $provider;
        $this->userDetails = null;
    }

    public function requestAuth() {
        // If we don't have an authorization code then get one
        $authUrl = $this->provider->getAuthorizationUrl();
        header('Location: '.$authUrl);
        exit;
    }

    public function processToken() {
        $token = $this->provider->getAccessToken('authorization_code', [
            'code' => $_GET['code']]);
        if (!is_null($token)){
            $this->userDetails = $this->provider->getUserDetails($token);
            return $this->userDetails;
        }
        return null;
    }

    public function linkAccount($serviceUID, $serviceType, $notes) {

        if (!Authenticate::isAuthenticated()) {
            print("Not logged in");
            exit;
        }
        //Update old keys even if they are assigned to other users
        $keys = Key::findKeyAndType($serviceUID, $serviceType);
        if (count($keys) > 0){
            $key = $keys[0];
        } else {
            $key = new Key();
        }
        $key->key = $serviceUID;
        $key->userid = CurrentUser::getIdentity();
        $key->type = $serviceType;
        $key->notes = $notes;

        $key->save();
    }

    public static function redirectHost(){
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'];
        return $protocol.$domainName;
    }
}
