<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/18/2015
 * Time: 11:06 AM.
 */

namespace app\security\oauth\modules;

use app\security\oauth\OAuthHelper;
use League\OAuth2\Client\Provider\Github;
use vhs\web\HttpServer;

class GithubOAuthHandler extends OAuthHandler {
    public function getUrl() {
        return '/oauth/github.php';
    }

    public function handle(HttpServer $server) {
        $host = OauthHelper::redirectHost();

        $action = isset($_GET['action']) ? $_GET['action'] : 'link';

        $provider = new Github([
            'clientId' => OAUTH_GITHUB_CLIENT,
            'clientSecret' => OAUTH_GITHUB_SECRET,
            'redirectUri' => $host . $this->getUrl() . '?action=' . $action,
            'scopes' => []
        ]);

        $oauthHelper = new OauthHelper($provider, $server);

        $userDetails = null;

        if (!isset($_GET['code'])) {
            $oauthHelper->requestAuth();
        } else {
            /** @var GithubResourceOwner | null */
            $userDetails = $oauthHelper->processToken();
        }

        if ($_GET['action'] == 'link' && !is_null($userDetails)) {
            $oauthHelper->linkAccount($userDetails->getId(), 'github', 'GitHub Account for ' . $userDetails->getNickname());

            $server->clear();
            $server->redirect('/index.html#/profile/');
            $server->end();
        }
    }
}
