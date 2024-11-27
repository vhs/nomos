<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/18/2015
 * Time: 11:05 AM
 */

namespace app\security\oauth\modules;

use app\security\oauth\OAuthHelper;
use League\OAuth2\Client\Provider\Google;
use vhs\web\HttpServer;

class GoogleOAuthHandler extends OAuthHandler {
    public function getUrl() {
        return '/oauth/google.php';
    }

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
            $userDetails = $oauthHelper->processToken();
        }

        if ($_GET['action'] == 'link' && !is_null($userDetails)) {
            $oauthHelper->linkAccount($userDetails->uid, 'google', 'Google Account for ' . $userDetails->name);

            $server->clear();
            $server->redirect('/index.html#/profile/');
            $server->end();
        }
    }
}
