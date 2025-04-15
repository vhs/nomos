<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/18/2015
 * Time: 11:05 AM.
 */

namespace app\security\oauth\modules;

use app\security\oauth\OAuthHelper;
use League\OAuth2\Client\Provider\Google;
use vhs\web\HttpServer;

/** @typescript */
class GoogleOAuthHandler extends OAuthHandler {
    /**
     * getUrl.
     *
     * @return string
     */
    public function getUrl() {
        return '/oauth/google.php';
    }

    /**
     * handle.
     *
     * @param \vhs\web\HttpServer $server
     *
     * @return void
     */
    public function handle(HttpServer $server) {
        $host = OauthHelper::redirectHost();

        $action = $_GET['action'] ?: 'link';

        $provider = new Google([
            'clientId' => OAUTH_GOOGLE_CLIENT,
            'clientSecret' => OAUTH_GOOGLE_SECRET,
            'redirectUri' => $host . $this->getUrl() . '?action=' . $action,
            'scopes' => ['email']
        ]);

        $oauthHelper = new OauthHelper($provider, $server);

        $userDetails = null;

        if (!isset($_GET['code'])) {
            $oauthHelper->requestAuth();
        } else {
            /** @var \League\OAuth2\Client\Provider\GoogleUser|null */
            $userDetails = $oauthHelper->processToken();
        }

        if ($_GET['action'] == 'link' && !is_null($userDetails)) {
            $oauthHelper->linkAccount($userDetails->getId(), 'google', 'Google Account for ' . $userDetails->getName());

            $server->clear();
            $server->redirect('/index.html#/profile/');
            $server->end();
        }
    }
}
