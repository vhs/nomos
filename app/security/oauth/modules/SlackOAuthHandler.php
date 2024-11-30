<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/18/2015
 * Time: 11:05 AM.
 */

namespace app\security\oauth\modules;

use app\security\oauth\OAuthHelper;
use app\security\oauth\providers\Slack;
use vhs\web\HttpServer;

class SlackOAuthHandler extends OAuthHandler {
    public function getUrl() {
        return '/oauth/slack.php';
    }

    public function handle(HttpServer $server) {
        $host = OauthHelper::redirectHost();

        $action = $_GET['action'] ?: 'link';

        $provider = new Slack([
            'clientId' => OAUTH_SLACK_CLIENT,
            'clientSecret' => OAUTH_SLACK_SECRET,
            'teamId' => OAUTH_SLACK_TEAM,
            'redirectUri' => $host . $this->getUrl() . '?action=' . $action,
            'scopes' => ['identify']
        ]);

        $oauthHelper = new OauthHelper($provider, $server);

        $userDetails = null;

        if (!isset($_GET['code'])) {
            $oauthHelper->requestAuth();
        } else {
            $userDetails = $oauthHelper->processToken();
        }

        if ($_GET['action'] == 'link' && !is_null($userDetails)) {
            $oauthHelper->linkAccount($userDetails->uid, 'slack', 'Slack Account for ' . $userDetails->nickname);

            $server->clear();
            $server->redirect('/index.html#/profile/');
            $server->end();
        }
    }
}
