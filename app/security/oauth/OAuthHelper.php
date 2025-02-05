<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/18/2015
 * Time: 11:59 AM.
 */

namespace app\security\oauth;

use app\constants\StringLiterals;
use app\domain\Key;
use app\domain\Privilege;
use app\security\Authenticate;
use League\OAuth2\Client\Provider\AbstractProvider;
use vhs\security\CurrentUser;
use vhs\web\HttpServer;

/** @typescript */
class OAuthHelper {
    /** @var AbstractProvider */
    private $provider;
    /** @var HttpServer */
    private $server;
    private $userDetails;

    public function __construct(AbstractProvider $provider, HttpServer $server) {
        $this->provider = $provider;
        $this->userDetails = null;
        $this->server = $server;
    }

    public static function redirectHost() {
        $protocol =
            defined('NOMOS_FORCE_HTTPS') || ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443)
                ? StringLiterals::HTTPS_PREFIX
                : StringLiterals::HTTP_PREFIX;
        $domainName = $_SERVER['HTTP_HOST'];

        return $protocol . $domainName;
    }

    public function linkAccount($serviceUID, $serviceType, $notes) {
        if (!Authenticate::isAuthenticated()) {
            print 'Not logged in';
            exit();
        }

        //Update old keys even if they are assigned to other users
        $keys = Key::findKeyAndType($serviceUID, $serviceType);

        if (!empty($keys)) {
            $key = $keys[0];
        } else {
            $key = new Key();
        }

        $key->key = $serviceUID;
        $key->userid = CurrentUser::getIdentity();
        $key->type = $serviceType;
        $key->notes = $notes;

        $key->privileges->clear();
        $key->save();

        $key->privileges->add(Privilege::findByCode('inherit'));

        $key->save();
    }

    public function processToken() {
        $token = $this->provider->getAccessToken('authorization_code', [
            'code' => $_GET['code']
        ]);
        if (!is_null($token)) {
            $this->userDetails = $this->provider->getResourceOwner($token);

            return $this->userDetails;
        }

        return null;
    }

    public function requestAuth(array $options = []) {
        // If we don't have an authorization code then get one
        $authUrl = $this->provider->getAuthorizationUrl($options);

        $this->server->clear();
        $this->server->redirect($authUrl);
        $this->server->end();
    }
}
